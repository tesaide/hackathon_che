using Isopoh.Cryptography.Argon2;

using Services.PasswordHashing;

using System.Text;

namespace Services.Auth;

public class PasswordHashingService : IPasswordHashingService
{
    public byte[] Hash(string password)
    {
        string hashString = Argon2.Hash(password);
        return Encoding.UTF8.GetBytes(hashString);
    }

    public bool Verify(byte[] hash, string password)
    {
        string hashString = Encoding.UTF8.GetString(hash);
        return Argon2.Verify(hashString, password);
    }
}
