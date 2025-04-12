using Services.Database;

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
        id, full_name, email, phone, avatar_url,
        verification_status, is_active, last_login_at
    FROM users
    """;

        return _db.Query(sql, reader =>
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
        });
    }

}
