#!/usr/bin/env bash
set -Eeo pipefail
# TODO swap to -Eeuo pipefail above (after handling all potentially-unset variables)

# usage: file_env VAR [DEFAULT]
#    ie: file_env 'XYZ_DB_PASSWORD' 'example'
# (will allow for "$XYZ_DB_PASSWORD_FILE" to fill in the value of
#  "$XYZ_DB_PASSWORD" from a file, especially for Docker's secrets feature)
file_env() {
	local var="$1"
	local fileVar="${var}_FILE"
	local def="${2:-}"
	if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
		echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
		exit 1
	fi
	local val="$def"
	if [ "${!var:-}" ]; then
		val="${!var}"
	elif [ "${!fileVar:-}" ]; then
		val="$(< "${!fileVar}")"
	fi
	export "$var"="$val"
	unset "$fileVar"
}

# check to see if this file is being run or sourced from another script
_is_sourced() {
	# https://unix.stackexchange.com/a/215279
	[ "${#FUNCNAME[@]}" -ge 2 ] \
		&& [ "${FUNCNAME[0]}" = '_is_sourced' ] \
		&& [ "${FUNCNAME[1]}" = 'source' ]
}

# used to create initial postgres directories and if run as root, ensure ownership to the "postgres" user
docker_create_db_directories() {
	local user; user="$(id -u)"

	mkdir -p "$PGDATA"
	chmod 700 "$PGDATA"

	# ignore failure since it will be fine when using the image provided directory; see also https://github.com/docker-library/postgres/pull/289
	mkdir -p /var/run/postgresql || :
	chmod 775 /var/run/postgresql || :

	# Create the transaction log directory before initdb is run so the directory is owned by the correct user
	if [ -n "$POSTGRES_INITDB_WALDIR" ]; then
		mkdir -p "$POSTGRES_INITDB_WALDIR"
		if [ "$user" = '0' ]; then
			find "$POSTGRES_INITDB_WALDIR" \! -user postgres -exec chown postgres '{}' +
		fi
		chmod 700 "$POSTGRES_INITDB_WALDIR"
	fi

	# allow the container to be started with `--user`
	if [ "$user" = '0' ]; then
		find "$PGDATA" \! -user postgres -exec chown postgres '{}' +
		find /var/run/postgresql \! -user postgres -exec chown postgres '{}' +
	fi
}

# initialize empty PGDATA directory with new database via 'initdb'
# arguments to `initdb` can be passed via POSTGRES_INITDB_ARGS or as arguments to this function
# `initdb` automatically creates the "postgres", "template0", and "template1" dbnames
# this is also where the database user is created, specified by `POSTGRES_USER` env
docker_init_database_dir() {
	# "initdb" is particular about the current user existing in "/etc/passwd", so we use "nss_wrapper" to fake that if necessary
	# see https://github.com/docker-library/postgres/pull/253, https://github.com/docker-library/postgres/issues/359, https://cwrap.org/nss_wrapper.html
	if ! getent passwd "$(id -u)" &> /dev/null && [ -e /usr/lib/libnss_wrapper.so ]; then
		export LD_PRELOAD='/usr/lib/libnss_wrapper.so'
		export NSS_WRAPPER_PASSWD="$(mktemp)"
		export NSS_WRAPPER_GROUP="$(mktemp)"
		echo "postgres:x:$(id -u):$(id -g):PostgreSQL:$PGDATA:/bin/false" > "$NSS_WRAPPER_PASSWD"
		echo "postgres:x:$(id -g):" > "$NSS_WRAPPER_GROUP"
	fi

	if [ -n "$POSTGRES_INITDB_WALDIR" ]; then
		set -- --waldir "$POSTGRES_INITDB_WALDIR" "$@"
	fi

	eval 'initdb --username="$POSTGRES_USER" --pwfile=<(echo "$POSTGRES_PASSWORD") '"$POSTGRES_INITDB_ARGS"' "$@"'

	# unset/cleanup "nss_wrapper" bits
	if [ "${LD_PRELOAD:-}" = '/usr/lib/libnss_wrapper.so' ]; then
		rm -f "$NSS_WRAPPER_PASSWD" "$NSS_WRAPPER_GROUP"
		unset LD_PRELOAD NSS_WRAPPER_PASSWD NSS_WRAPPER_GROUP
	fi
}

# print large warning if POSTGRES_PASSWORD is long
# error if both POSTGRES_PASSWORD is empty and POSTGRES_HOST_AUTH_METHOD is not 'trust'
# print large warning if POSTGRES_HOST_AUTH_METHOD is set to 'trust'
# assumes database is not set up, ie: [ -z "$DATABASE_ALREADY_EXISTS" ]
docker_verify_minimum_env() {
	# check password first so we can output the warning before postgres
	# messes it up
	if [ "${#POSTGRES_PASSWORD}" -ge 100 ]; then
		cat >&2 <<-'EOWARN'

			WARNING: The supplied POSTGRES_PASSWORD is 100+ characters.

			  This will not work if used via PGPASSWORD with "psql".

			  https://www.postgresql.org/message-id/flat/E1Rqxp2-0004Qt-PL%40wrigleys.postgresql.org (BUG #6412)
			  https://github.com/docker-library/postgres/issues/507

		EOWARN
	fi
	if [ -z "$POSTGRES_PASSWORD" ] && [ 'trust' != "$POSTGRES_HOST_AUTH_METHOD" ]; then
		# The - option suppresses leading tabs but *not* spaces. :)
		cat >&2 <<-'EOE'
			Error: Database is uninitialized and superuser password is not specified.
			       You must specify POSTGRES_PASSWORD to a non-empty value for the
			       superuser. For example, "-e POSTGRES_PASSWORD=password" on "docker run".

			       You may also use "POSTGRES_HOST_AUTH_METHOD=trust" to allow all
			       connections without a password. This is *not* recommended.

			       See PostgreSQL documentation about "trust":
			       https://www.postgresql.org/docs/current/auth-trust.html
		EOE
		exit 1
	fi
	if [ 'trust' = "$POSTGRES_HOST_AUTH_METHOD" ]; then
		cat >&2 <<-'EOWARN'
			********************************************************************************
			WARNING: POSTGRES_HOST_AUTH_METHOD has been set to "trust". This will allow
			         anyone with access to the Postgres port to access your database without
			         a password, even if POSTGRES_PASSWORD is set. See PostgreSQL
			         documentation about "trust":
			         https://www.postgresql.org/docs/current/auth-trust.html
			         In Docker's default configuration, this is effectively any other
			         container on the same system.

			         It is not recommended to use POSTGRES_HOST_AUTH_METHOD=trust. Replace
			         it with "-e POSTGRES_PASSWORD=password" instead to set a password in
			         "docker run".
			********************************************************************************
		EOWARN
	fi
}

# usage: docker_process_init_files [file [file [...]]]
#    ie: docker_process_init_files /always-initdb.d/*
# process initializer files, based on file extensions and permissions
docker_process_init_files() {
	# psql here for backwards compatiblilty "${psql[@]}"
	psql=( docker_process_sql )

	echo
	local f
	for f; do
		case "$f" in
			*.sh)
				# https://github.com/docker-library/postgres/issues/450#issuecomment-393167936
				# https://github.com/docker-library/postgres/pull/452
				if [ -x "$f" ]; then
					echo "$0: running $f"
					"$f"
				else
					echo "$0: sourcing $f"
					. "$f"
				fi
				;;
			*.sql)    echo "$0: running $f"; docker_process_sql -f "$f"; echo ;;
			*.sql.gz) echo "$0: running $f"; gunzip -c "$f" | docker_process_sql; echo ;;
			*.sql.xz) echo "$0: running $f"; xzcat "$f" | docker_process_sql; echo ;;
			*)        echo "$0: ignoring $f" ;;
		esac
		echo
	done
}

# Execute sql script, passed via stdin (or -f flag of psql)
# usage: docker_process_sql [psql-cli-args]
#    ie: docker_process_sql --dbname=mydb <<<'INSERT ...'
#    ie: docker_process_sql -f my-file.sql
#    ie: docker_process_sql <my-file.sql
docker_process_sql() {
	local query_runner=( psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --no-password )
	if [ -n "$POSTGRES_DB" ]; then
		query_runner+=( --dbname "$POSTGRES_DB" )
	fi

	"${query_runner[@]}" "$@"
}

# create initial database
# uses environment variables for input: POSTGRES_DB
docker_setup_db() {
	if [ "$POSTGRES_DB" != 'postgres' ]; then
		POSTGRES_DB= docker_process_sql --dbname postgres --set db="$POSTGRES_DB" <<-'EOSQL'
			CREATE DATABASE :"db" ;
		EOSQL
		echo
	fi
}

# Loads various settings that are used elsewhere in the script
# This should be called before any other functions
docker_setup_env() {
	file_env 'POSTGRES_PASSWORD'

	file_env 'POSTGRES_USER' 'postgres'
	file_env 'POSTGRES_DB' "$POSTGRES_USER"
	file_env 'POSTGRES_INITDB_ARGS'
	# default authentication method is md5
	: "${POSTGRES_HOST_AUTH_METHOD:=md5}"

	declare -g DATABASE_ALREADY_EXISTS
	# look specifically for PG_VERSION, as it is expected in the DB dir
	if [ -s "$PGDATA/PG_VERSION" ]; then
		DATABASE_ALREADY_EXISTS='true'
	fi
}

# append POSTGRES_HOST_AUTH_METHOD to pg_hba.conf for "host" connections
pg_setup_hba_conf() {
	{
		echo
		if [ 'trust' = "$POSTGRES_HOST_AUTH_METHOD" ]; then
			echo '# warning trust is enabled for all connections'
			echo '# see https://www.postgresql.org/docs/17/auth-trust.html'
		fi
		echo "host all all all $POSTGRES_HOST_AUTH_METHOD"
	} >> "$PGDATA/pg_hba.conf"
}

# start socket-only postgresql server for setting up or running scripts
# all arguments will be passed along as arguments to `postgres` (via pg_ctl)
docker_temp_server_start() {
	if [ "$1" = 'postgres' ]; then
		shift
	fi

	# internal start of server in order to allow setup using psql client
	# does not listen on external TCP/IP and waits until start finishes
	set -- "$@" -c listen_addresses='' -p "${PGPORT:-5432}"

	PGUSER="${PGUSER:-$POSTGRES_USER}" \
	pg_ctl -D "$PGDATA" \
		-o "$(printf '%q ' "$@")" \
		-w start
}

# stop postgresql server after done setting up user and running scripts
docker_temp_server_stop() {
	PGUSER="${PGUSER:-postgres}" \
	pg_ctl -D "$PGDATA" -m fast -w stop
}


pg_setup_pg_stat_monitor_and_pg_tde() {
	libraries='pg_stat_monitor'
	if [[ -n "${ENABLE_PG_TDE}" && "${ENABLE_PG_TDE}" != "0" ]]; then
		libraries='pg_stat_monitor,pg_tde'
	fi
	docker_process_sql --dbname postgres <<-EOSQL
		alter system set shared_preload_libraries=${libraries} ;
	EOSQL
}

pg_setup_percona_pg_telemetry() {
	libraries='pg_stat_monitor,percona_pg_telemetry'
	if [[ -n "${ENABLE_PG_TDE}" && "${ENABLE_PG_TDE}" != "0" ]]; then
		libraries='pg_stat_monitor,percona_pg_telemetry,pg_tde'
	fi
	docker_process_sql --dbname postgres <<-EOSQL
		alter system set shared_preload_libraries= ${libraries};
	EOSQL
}

# check arguments for an option that would cause postgres to stop
# return true if there is one
_pg_want_help() {
	local arg
	for arg; do
		case "$arg" in
			# postgres --help | grep 'then exit'
			# leaving out -C on purpose since it always fails and is unhelpful:
			# postgres: could not access the server configuration file "/var/lib/postgresql/data/postgresql.conf": No such file or directory
			-'?'|--help|--describe-config|-V|--version)
				return 0
				;;
		esac
	done
	return 1
}

_main() {
	# if first arg looks like a flag, assume we want to run postgres server
	if [ "${1:0:1}" = '-' ]; then
		set -- postgres "$@"
	fi

	export PATH=$PATH:/usr/pgsql-17/bin

	if [ "$1" = 'postgres' ] && ! _pg_want_help "$@"; then
		docker_setup_env
		# setup data directories and permissions (when run as root)
		if [[ -z "$PGDATA" ]]; then
			export PGDATA=/data/db
		fi
		docker_create_db_directories
		if [ "$(id -u)" = '0' ]; then
			# then restart script as postgres user
			exec gosu postgres "$BASH_SOURCE" "$@"
		fi

		# only run initialization on an empty data directory
		if [ -z "$DATABASE_ALREADY_EXISTS" ]; then
			docker_verify_minimum_env

			# check dir permissions to reduce likelihood of half-initialized database
			ls /docker-entrypoint-initdb.d/ > /dev/null

			docker_init_database_dir
			pg_setup_hba_conf

			# PGPASSWORD is required for psql when authentication is required for 'local' connections via pg_hba.conf and is otherwise harmless
			# e.g. when '--auth=md5' or '--auth-local=md5' is used in POSTGRES_INITDB_ARGS
			export PGPASSWORD="${PGPASSWORD:-$POSTGRES_PASSWORD}"
			docker_temp_server_start "$@"

			docker_setup_db
			docker_process_init_files /docker-entrypoint-initdb.d/*
			if [[ "x${PERCONA_TELEMETRY_DISABLE}" == "x" ]] || [[ ${PERCONA_TELEMETRY_DISABLE} == "0" ]]; then
                                pg_setup_percona_pg_telemetry
                                /usr/bin/telemetry-agent-supervisor.sh &
                        else
				pg_setup_pg_stat_monitor_and_pg_tde
                        fi

			docker_temp_server_stop
			unset PGPASSWORD

			echo
			echo 'PostgreSQL init process complete; ready for start up.'
			echo
		else
			echo
			echo 'PostgreSQL Database directory appears to contain a database; Skipping initialization'
			echo
		fi
	fi

	exec "$@"
}

if ! _is_sourced; then
	_main "$@"
fi