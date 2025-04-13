using Services.Database;
using Services.Database.Helpers;
using Models.Users;

namespace Services.Users;

public class GetUsersService
{
    private readonly IDbService _db;

    public GetUsersService(IDbService db)
    {
        _db = db;
    }

    public IEnumerable<UserDto> GetAllUsers()
    {
        const string sql = """
        SELECT 
            id, created_at, updated_at, last_login_at, is_active,
            password, role_id, verification_status, organization_id,
            email, full_name, phone, avatar_url, gov_id
        FROM users
        """;

        return _db.Query(sql, r =>
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
        });
    }
}
