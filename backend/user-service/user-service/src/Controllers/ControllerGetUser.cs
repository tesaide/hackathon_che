using Controllers.Users.Common;

using Microsoft.AspNetCore.Mvc;

using Services.Token;
using Services.Users;

using Models.Users;

namespace Controllers.Users;

[ApiController]
[Route("api/admin/get_user")]
public class ControllerGetUser(
    ITokenPacketProcessorService tokenService,
    GetUserService userDataService
) : ControllerBaseAdminRequired(tokenService)

{
    [HttpPost]
    public IActionResult GetUser([FromBody] GetUserRequest req)
    {
        try
        {
            var user = userDataService.GetUser(req.Id);
            return Ok(new { user });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Internal error", error = ex.Message });
        }
    }

}
