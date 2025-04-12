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
        Console.WriteLine("[INIT] ControllerGetUsers initialized");
        _tokenService = tokenService;
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        Console.WriteLine("[REQUEST] GET /api/admin/get_users");

        if (_tokenService.TryValidateToken(Request, out var userId))
        {
            Console.WriteLine($"[OK] Token valid for userId: {userId}");
            return Ok(new { message = "OK", userId });
        }

        Console.WriteLine("[ERR] Invalid token");
        return Unauthorized(new { message = "Invalid token" });
    }
}
