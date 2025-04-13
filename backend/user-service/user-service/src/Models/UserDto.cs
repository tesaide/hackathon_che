namespace Models.Users;

public record UserDto(
    Guid Id,
    DateTime CreatedAt,
    DateTime UpdatedAt,
    DateTime? LastLoginAt,
    bool IsActive,
    string Password,
    Guid RoleId,
    string VerificationStatus,
    Guid OrganizationId,
    string Email,
    string FullName,
    string Phone,
    string AvatarUrl,
    string GovId
);
