namespace Services.PasswordHashing;

public interface IPasswordHashingService
{
    byte[] Hash(string password);

    bool Verify(byte[] hash, string password);
}
