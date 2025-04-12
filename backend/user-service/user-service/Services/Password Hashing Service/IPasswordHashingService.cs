namespace Services.PasswordHashing;

public interface IPasswordHashingService
{
    string Hash(string password);

    bool Verify(string hash, string password);
}
