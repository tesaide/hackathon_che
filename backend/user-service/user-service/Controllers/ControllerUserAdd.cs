using Microsoft.AspNetCore.Mvc;
using UserService.Services;

namespace UserService.Controllers;

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
