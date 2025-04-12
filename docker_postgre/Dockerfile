FROM oraclelinux:9

LABEL org.opencontainers.image.authors="info@percona.com"

RUN dnf -y update; \
    dnf -y install glibc-langpack-en

ENV PPG_VERSION 17.4-1
ENV OS_VER el9
ENV FULL_PERCONA_VERSION "$PPG_VERSION.$OS_VER"
ENV POSTGIS_MAJOR 3
ENV PG_MAJOR 17

# Отключаем телеметрию во время создания образа
ARG PERCONA_TELEMETRY_DISABLE=1

# Проверяем подпись пакета репозитория безопасным способом
RUN set -ex; \
    export GNUPGHOME="$(mktemp -d)"; \
    gpg --batch --keyserver keyserver.ubuntu.com --recv-keys 4D1BB29D63D98E422B2113B19334A25F8507EFA5 99DB70FAE1D7CE227FB6488205B555B38483C65D 68C9E2B91A37D136FE74D1761F16D2E1442DF0F8; \
    gpg --batch --export --armor 4D1BB29D63D98E422B2113B19334A25F8507EFA5 > ${GNUPGHOME}/PERCONA-PACKAGING-KEY; \
    gpg --batch --export --armor 99DB70FAE1D7CE227FB6488205B555B38483C65D > ${GNUPGHOME}/RPM-GPG-KEY-centosofficial; \
    gpg --batch --export --armor 68C9E2B91A37D136FE74D1761F16D2E1442DF0F8 > ${GNUPGHOME}/RPM-GPG-KEY-PGDG; \
    rpmkeys --import ${GNUPGHOME}/PERCONA-PACKAGING-KEY ${GNUPGHOME}/RPM-GPG-KEY-centosofficial ${GNUPGHOME}/RPM-GPG-KEY-PGDG; \
    dnf install -y findutils; \
    curl -Lf -o /tmp/percona-release.rpm https://repo.percona.com/yum/percona-release-latest.noarch.rpm; \
    rpmkeys --checksig /tmp/percona-release.rpm; \
    rpm -i /tmp/percona-release.rpm; \
    rm -rf "$GNUPGHOME" /tmp/percona-release.rpm; \
    rpm --import /etc/pki/rpm-gpg/PERCONA-PACKAGING-KEY; \
    percona-release enable ppg-17.4 testing;

# Устанавливаем необходимые пакеты
RUN set -ex; \
    dnf -y update; \
    dnf -y install \
        bind-utils \
        gettext \
        hostname \
        perl \
        tar \
        bzip2 \
        lz4 \
        procps-ng; \
    dnf -y install  \
        nss_wrapper \
        shadow-utils \
        libpq \
        epel-release \
        libedit; \
    dnf clean all

# Создаем пользователя postgres
RUN useradd -u 1001 -r -g 0 -s /sbin/nologin \
            -c "Default Application User" postgres

# Настраиваем директорию данных
ENV PGDATA /data/db
RUN sed -i 's:enabled=0:enabled=1:g' /etc/yum.repos.d/oracle-linux-ol9.repo

# Устанавливаем PostgreSQL с PostGIS и другими расширениями
RUN set -ex; \
    dnf install -y \
        percona-postgresql17-server-${FULL_PERCONA_VERSION} \
        percona-postgresql17-contrib-${FULL_PERCONA_VERSION} \
        percona-postgresql-common \
        percona-pg_stat_monitor17 \
        percona-pg_repack17 \
        percona-pgaudit17_set_user \
        percona-pgvector_17 \
        percona-wal2json17 \
        percona-postgis33_17; \
    dnf clean all; \
    rm -rf /var/cache/dnf /var/cache/yum $PGDATA && mkdir -p $PGDATA /docker-entrypoint-initdb.d; \
    chown -R 1001:0 $PGDATA docker-entrypoint-initdb.d

# Настраиваем PostgreSQL для прослушивания на всех интерфейсах
RUN set -ex; \
    sed -ri "s!^#?(listen_addresses)\s*=\s*\S+.*!\1 = '*'!" /usr/pgsql-17/share/postgresql.conf.sample; \
    grep -F "listen_addresses = '*'" /usr/pgsql-17/share/postgresql.conf.sample

# Устанавливаем gosu для запуска процессов от правильного пользователя
ENV GOSU_VERSION=1.11
RUN set -eux; \
    curl -Lf -o /usr/bin/gosu https://github.com/tianon/gosu/releases/download/${GOSU_VERSION}/gosu-amd64; \
    curl -Lf -o /usr/bin/gosu.asc https://github.com/tianon/gosu/releases/download/${GOSU_VERSION}/gosu-amd64.asc; \
    \
    export GNUPGHOME="$(mktemp -d)"; \
    gpg --batch --keyserver hkps://keys.openpgp.org --recv-keys B42F6819007F00F88E364FD4036A9C25BF357DD4; \
    gpg --batch --verify /usr/bin/gosu.asc /usr/bin/gosu; \
    rm -rf "$GNUPGHOME" /usr/bin/gosu.asc; \
    \
    chmod +x /usr/bin/gosu;

# Копируем скрипты инициализации
RUN mkdir -p /docker-entrypoint-initdb.d
COPY ./initdb-postgis.sh /docker-entrypoint-initdb.d/10_postgis.sh
RUN chmod +x /docker-entrypoint-initdb.d/10_postgis.sh

COPY ./update-postgis.sh /usr/local/bin
RUN chmod +x /usr/local/bin/update-postgis.sh

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

VOLUME ["/data/db"]

ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 5432

USER 1001

CMD ["postgres"]