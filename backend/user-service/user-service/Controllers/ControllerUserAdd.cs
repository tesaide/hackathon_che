using Controllers.Users.Common;
using Microsoft.AspNetCore.Mvc;
using Services.Token;

namespace Controllers.Users;

[ApiController]
[Route("api/admin/user_add")]
public class ControllerUserAdd(ITokenPacketProcessorService tokenService) : ControllerBaseTokenized(tokenService)
{
    [HttpGet]
    public IActionResult GetUsers()
    {
        return Ok(new { message = "TODO: Add!", UserId });
    }
}
