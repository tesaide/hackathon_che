using Services.Database;

using Models.Users;

namespace Services.Users;

public class ChangeUserService
{
    private readonly IDbService _db;

    public ChangeUserService(IDbService db)
    {
        _db = db;
    }

    public void ChangeUser(UserDto user)
    {
        const string sql = """
        UPDATE users SET
            is_active = @IsActive,
            role_id = @RoleId,
            verification_status = @VerificationStatus,
            organization_id = @OrganizationId,
            email = @Email,
            full_name = @FullName,
            phone = @Phone,
            avatar_url = @AvatarUrl,
            gov_id = @GovId
        WHERE id = @Id;
    """;

        _db.Execute(sql, new
        {
            user.IsActive,
            user.RoleId,
            user.VerificationStatus,
            user.OrganizationId,
            user.Email,
            user.FullName,
            user.Phone,
            user.AvatarUrl,
            user.GovId,
            user.Id
        });
    }
}