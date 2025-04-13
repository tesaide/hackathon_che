using Controllers.Users.Common;
using Microsoft.AspNetCore.Mvc;
using Services.Token;
using Services.Users;

using ChangeUserRequest = Models.Users.UserDto;

namespace Controllers.Users;

[ApiController]
[Route("api/admin/user_change")]
public class ControllerChangeUser(
    ITokenPacketProcessorService tokenService,
    ChangeUserService changeUserService
) : ControllerBaseAdminRequired(tokenService)
{
    [HttpPost]
    public IActionResult ChangeUser([FromBody] ChangeUserRequest req)
    {
        try
        {
            changeUserService.ChangeUser(req);
            return Ok(new { message = "OK" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Internal error", error = ex.Message });
        }
    }
}
