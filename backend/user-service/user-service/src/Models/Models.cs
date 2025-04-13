namespace Models.Users;

public record AddUserRequest(string FullName, string Email, string Password);

public record ChangeUserRequest1(Guid Id, DateTime CreatedAt, string Email, string Phone, string VerificationStatus);

public record GetUserRequest(Guid Id);

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