using Controllers.Users.Common;
using Microsoft.AspNetCore.Mvc;
using Services.Token;
using Services.Users;

namespace Controllers.Users;

[ApiController]
[Route("api/admin/get_users")]
public class ControllerGetUsers(
    ITokenPacketProcessorService tokenService,
    UserDataService userDataService
) : ControllerBaseTokenized(tokenService)

{
    [HttpGet]
    public IActionResult GetUsers([FromServices] ILogger<ControllerGetUsers> logger)
    {
        logger.LogInformation("Запрос на /api/admin/get_users");

        try
        {
            var users = userDataService.GetAllUsers();
            logger.LogInformation("Вернул {count} пользователей", users.Count());
            return Ok(new { message = "OK", userId = UserId, users });
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ошибка при получении пользователей");
            return Ok(new { message = "Internal error" });
        }
    }

}
