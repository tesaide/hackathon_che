using Services.Database;
using Services.Database.Helpers;

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

    public Guid CreateUser(string fullName, string email, byte[] passwordHash)
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
            id, created_at, updated_at, last_login_at, is_active,
            password, role_id, verification_status, organization_id,
            email, full_name, phone, avatar_url, gov_id
        FROM users
        WHERE id = @Id
        """;

        return _db.QuerySingle(sql, r =>
        {
            return new UserDto(
                r._GetGuid("id"),
                r._GetDateTime("created_at"),
                r._GetDateTime("updated_at"),
                r._GetNullableDateTime("last_login_at"),
                r._GetBool("is_active"),
                Convert.ToBase64String(r._GetByteArray("password")),
                r._GetGuid("role_id"),
                r._GetString("verification_status"),
                r._GetGuid("organization_id"),
                r._GetString("email"),
                r._GetString("full_name"),
                r._GetString("phone"),
                r._GetString("avatar_url"),
                r._GetString("gov_id")
            );
        }, new { Id = id });
    }
}