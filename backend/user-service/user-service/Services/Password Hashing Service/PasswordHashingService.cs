using Isopoh.Cryptography.Argon2;
using Services.PasswordHashing;

namespace Services.Auth;

public class Argon2PasswordHashingService : IPasswordHashingService
{
    public string Hash(string password)
    {
        return Argon2.Hash(password);
    }

    public bool Verify(string hash, string password)
    {
        return Argon2.Verify(hash, password);
    }
}
