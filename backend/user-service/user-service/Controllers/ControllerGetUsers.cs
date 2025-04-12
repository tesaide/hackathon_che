using Microsoft.AspNetCore.Mvc;
using UserService.Services;

namespace UserService.Controllers;

[ApiController]
[Route("api/admin/get_users")]
public class ControllerGetUsers : ControllerBase
{
    private readonly ITokenPacketProcessorService _tokenService;

    public ControllerGetUsers(ITokenPacketProcessorService tokenService)
    {
        _tokenService = tokenService;
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        if (_tokenService.TryValidateToken(Request, out var userId))
        {
            return Ok(new { message = "OK", userId });
        }

        return Unauthorized(new { message = "Invalid token" });
    }
}
