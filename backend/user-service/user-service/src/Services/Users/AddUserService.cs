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
            reader.GetBool(0),
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
                r.GetGuid("id"),
                r.GetDateTime("created_at"),
                r.GetDateTime("updated_at"),
                r.GetNullableDateTime("last_login_at"),
                r.GetBool("is_active"),
                r.GetByteArray("password"),
                r.GetGuid("role_id"),
                r.GetString("verification_status"),
                r.GetGuid("organization_id"),
                r.GetString("email"),
                r.GetString("full_name"),
                r.GetString("phone"),
                r.GetString("avatar_url"),
                r.GetString("gov_id")
            );
        }, new { Id = id });
    }
}