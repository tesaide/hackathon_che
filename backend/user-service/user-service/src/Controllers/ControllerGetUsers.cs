using Controllers.Users.Common;
using Microsoft.AspNetCore.Mvc;
using Services.Token;
using Services.Users;

namespace Controllers.Users;

[ApiController]
[Route("api/admin/get_users")]
public class ControllerGetUsers(
    ITokenPacketProcessorService tokenService,
    GetUsersService userDataService
) : ControllerBaseAdminRequired(tokenService)

{
    [HttpGet]
    public IActionResult GetUsers([FromServices] ILogger<ControllerGetUsers> logger)
    {
        try
        {
            var users = userDataService.GetAllUsers();
            return Ok(new { users });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Internal error", error = ex.Message });
        }
    }

}
