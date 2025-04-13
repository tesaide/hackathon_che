using Controllers.Users.Common;

using Microsoft.AspNetCore.Mvc;

using Services.Token;
using Services.Users;

using Models.Users;

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
            changeUserService.ChangeUser(req.Id, req.CreatedAt, req.Email, req.FullName, req.Phone, req.VerificationStatus);
            return Ok(new { message = "User updated successfully" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Internal error", error = ex.Message });
        }
    }
}
