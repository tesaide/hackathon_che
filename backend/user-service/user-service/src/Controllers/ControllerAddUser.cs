﻿using Controllers.Users.Common;

using Microsoft.AspNetCore.Mvc;

using Services.Token;
using Services.PasswordHashing;
using Services.Users;

using Models.Users;

namespace Controllers.Users;

[ApiController]
[Route("api/admin/user_add")]
public class ControllerAddUser(
    ITokenPacketProcessorService tokenService,
    IPasswordHashingService passwordHasher,
    AddUserService addUserService
) : ControllerBaseAdminRequired(tokenService)
{
    [HttpPost]
    public IActionResult AddUser([FromBody] AddUserRequest req)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(req.FullName)) return BadRequest(new { message = "Full name is required" });

            if (string.IsNullOrWhiteSpace(req.Email)) return BadRequest(new { message = "Email is required" });

            if (string.IsNullOrWhiteSpace(req.Password)) return BadRequest(new { message = "Password is required" });

            if (addUserService.EmailExists(req.Email)) return Conflict(new { message = "Email already exists" });

            var hash = passwordHasher.Hash(req.Password);

            var id = addUserService.CreateUser(req.FullName, req.Email, hash);

            var createdUser = addUserService.GetById(id);

            if (createdUser is null) return StatusCode(500, new { message = "Internal Error" });

            return Ok(new { createdUser });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Internal error", error = ex.Message });
        }
    }
}
