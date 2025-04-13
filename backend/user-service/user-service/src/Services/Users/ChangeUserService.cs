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

    public void ChangeUser(ChangeUserRequest user)
    {
        
    }
}