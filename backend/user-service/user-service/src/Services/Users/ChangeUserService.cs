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

    public void ChangeUser(Guid id, DateTime createdAt, string email, string fullName, string phone, string verificationStatus)
    {
        const string sql = """
        UPDATE users
        SET 
            created_at = @CreatedAt,
            email = @Email,
            full_name = @FullName,
            phone = @Phone,
            verification_status = @VerificationStatus::verification_status_enum,
            updated_at = NOW()
        WHERE id = @Id
    """;

        _db.Execute(sql, new
        {
            Id = id,
            CreatedAt = createdAt,
            Email = email,
            FullName = fullName,
            Phone = phone,
            VerificationStatus = verificationStatus
        });
    }
}