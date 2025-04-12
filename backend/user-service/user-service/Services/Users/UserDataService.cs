using Services.Database;

using Models.Users;

namespace Services.Users;

public class UserDataService
{
    private readonly IDbService _db;

    public UserDataService(IDbService db)
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

        return _db.Query(sql, reader =>
        {
            return new UserDto(
                reader.GetGuid(reader.GetOrdinal("id")),
                reader.GetDateTime(reader.GetOrdinal("created_at")),
                reader.GetDateTime(reader.GetOrdinal("updated_at")),
                reader.IsDBNull(reader.GetOrdinal("last_login_at")) ? null : reader.GetDateTime(reader.GetOrdinal("last_login_at")),
                reader.GetBoolean(reader.GetOrdinal("is_active")),
                (byte[])reader["password"],
                reader.GetGuid(reader.GetOrdinal("role_id")),
                reader.GetString(reader.GetOrdinal("verification_status")),
                reader.GetGuid(reader.GetOrdinal("organization_id")),
                reader.GetString(reader.GetOrdinal("email")),
                reader.GetString(reader.GetOrdinal("full_name")),
                reader.GetString(reader.GetOrdinal("phone")),
                reader.GetString(reader.GetOrdinal("avatar_url")),
                reader.GetString(reader.GetOrdinal("gov_id"))
            );
        });
    }
}
