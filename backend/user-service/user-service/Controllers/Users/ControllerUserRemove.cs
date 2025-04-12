using Controllers.Users.Common;
using Microsoft.AspNetCore.Mvc;
using Services.Token;

namespace Controllers.Users;

[ApiController]
[Route("api/admin/user_remove")]
public class ControllerUserRemove(ITokenPacketProcessorService tokenService) : ControllerBaseTokenized(tokenService)
{
    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok(new { message = "TODO: Remove!", UserId });
    }
}
