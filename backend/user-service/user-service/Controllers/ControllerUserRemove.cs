using Microsoft.AspNetCore.Mvc;
using UserService.Services;

namespace UserService.Controllers;

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
