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
            created_at = @CreatedAt,
            updated_at = @UpdatedAt,
            last_login_at = @LastLoginAt,
            is_active = @IsActive,
            password = @Password,
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
            user.CreatedAt,
            user.UpdatedAt,
            user.LastLoginAt,
            user.IsActive,
            Password = Convert.FromBase64String(user.Password),
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