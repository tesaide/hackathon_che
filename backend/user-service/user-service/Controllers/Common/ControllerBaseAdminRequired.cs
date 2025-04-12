using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Services.Token;

namespace Controllers.Users.Common;

[ApiController]
public abstract class ControllerBaseAdminRequired : ControllerBase, IActionFilter
{
    protected ITokenPacketProcessorService _tokenService;

    protected Guid UserId { get; private set; }

    protected ControllerBaseAdminRequired(ITokenPacketProcessorService tokenService)
    {
        _tokenService = tokenService;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        if (!_tokenService.TryValidateToken(context.HttpContext.Request, out var userId))
        {
            //context.Result = new UnauthorizedObjectResult(new { message = "Invalid token" });
            
            return;
        }

        UserId = userId;
    }

    public void OnActionExecuted(ActionExecutedContext context) {  }
}
