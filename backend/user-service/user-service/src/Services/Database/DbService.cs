using Npgsql;

using System.Data;

namespace Services.Database;

public sealed class DbService : IDbService
{
    private readonly string _connectionString;

    public DbService(IConfiguration config)
    {
        _connectionString = config.GetConnectionString("Postgres")!;
    }

    public T? QuerySingle<T>(string sql, Func<IDataReader, T> map, object? parameters = null)
    {
        using var conn = new NpgsqlConnection(_connectionString);
        conn.Open();

        using var cmd = new NpgsqlCommand(sql, conn);
        AddParameters(cmd, parameters);

        using var reader = cmd.ExecuteReader();
        return reader.Read() ? map(reader) : default;
    }

    public IEnumerable<T> Query<T>(string sql, Func<IDataReader, T> map, object? parameters = null)
    {
        using var conn = new NpgsqlConnection(_connectionString);
        conn.Open();

        using var cmd = new NpgsqlCommand(sql, conn);
        AddParameters(cmd, parameters);

        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            yield return map(reader);
        }
    }

    public int Execute(string sql, object? parameters = null)
    {
        using var conn = new NpgsqlConnection(_connectionString);
        conn.Open();

        using var cmd = new NpgsqlCommand(sql, conn);
        AddParameters(cmd, parameters);

        return cmd.ExecuteNonQuery();
    }

    private void AddParameters(NpgsqlCommand cmd, object? parameters)
    {
        if (parameters == null) return;

        foreach (var prop in parameters.GetType().GetProperties())
        {
            var name = "@" + prop.Name;
            var value = prop.GetValue(parameters) ?? DBNull.Value;

            var param = cmd.Parameters.Add(name, GetDbType(value));
            param.Value = value;
        }
    }

    private NpgsqlTypes.NpgsqlDbType GetDbType(object value) =>
        value switch
        {
            Guid => NpgsqlTypes.NpgsqlDbType.Uuid,
            byte[] => NpgsqlTypes.NpgsqlDbType.Bytea,
            bool => NpgsqlTypes.NpgsqlDbType.Boolean,
            int => NpgsqlTypes.NpgsqlDbType.Integer,
            long => NpgsqlTypes.NpgsqlDbType.Bigint,
            DateTime => NpgsqlTypes.NpgsqlDbType.Timestamp,
            _ => NpgsqlTypes.NpgsqlDbType.Text
        };
}
