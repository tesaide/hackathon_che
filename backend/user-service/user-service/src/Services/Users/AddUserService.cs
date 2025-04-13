using Services.Database;

using Models.Users;

namespace Services.Users;

public class AddUserService
{
    private readonly IDbService _db;

    public AddUserService(IDbService db)
    {
        _db = db;
    }

    public bool EmailExists(string email)
    {
        const string sql = "SELECT EXISTS(SELECT 1 FROM users WHERE email = @Email);";

        return _db.QuerySingle(sql, reader =>
            reader.GetBoolean(0),
            new { Email = email }
        );
    }

    public Guid CreateUser(string fullName, string email, string passwordHash)
    {
        const string sql = """
        INSERT INTO users (id, full_name, email, password)
        VALUES (@Id, @FullName, @Email, @Password);
    """;

        var id = Guid.NewGuid();

        _db.Execute(sql, new
        {
            Id = id,
            FullName = fullName,
            Email = email,
            Password = passwordHash
        });

        return id;
    }

    public UserDto? GetById(Guid id)
    {
        const string sql = """
        SELECT 
            id, full_name, email, phone, avatar_url,
            verification_status, is_active, last_login_at
        FROM users
        WHERE id = @Id
    """;

        return _db.QuerySingle(sql, reader =>
        {
            return new UserDto(
                reader.GetGuid(reader.GetOrdinal("id")),
                reader.GetString(reader.GetOrdinal("full_name")),
                reader.GetString(reader.GetOrdinal("email")),
                reader.GetString(reader.GetOrdinal("phone")),
                reader.GetString(reader.GetOrdinal("avatar_url")),
                reader.GetString(reader.GetOrdinal("verification_status")),
                reader.GetBoolean(reader.GetOrdinal("is_active")),
                reader.IsDBNull(reader.GetOrdinal("last_login_at"))
                    ? null
                    : reader.GetDateTime(reader.GetOrdinal("last_login_at"))
            );
        }, new { Id = id });
    }
}
