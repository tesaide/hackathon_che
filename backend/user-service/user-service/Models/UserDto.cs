namespace Models.Users;

public record UserDto
(
    Guid Id,
    string FullName,
    string Email,
    string Phone,
    string AvatarUrl,
    string VerificationStatus,
    bool IsActive,
    DateTime? LastLoginAt
);
