using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;

using System.Security.Claims;
using System.Security.Cryptography;

namespace UserService.Services;

public class TokenPacketProcessorService : ITokenPacketProcessorService
{
    private readonly IConfiguration _configuration;
    private readonly TokenValidationParameters _validationParameters;

    public TokenPacketProcessorService(IConfiguration configuration)
    {
        _configuration = configuration;

        var publicKeyPath = _configuration["Jwt:PublicKeyPath"];
        var publicKeyText = File.ReadAllText(publicKeyPath!);

        var rsa = RSA.Create();
        rsa.ImportFromPem(publicKeyText.ToCharArray());

        _validationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new RsaSecurityKey(rsa)
        };
    }

    public bool TryValidateToken(HttpRequest request, out Guid userId)
    {
        userId = Guid.Empty;

        if (!request.Headers.TryGetValue("Authorization", out var authHeader))
            return false;

        var token = authHeader.ToString().Replace("Bearer ", "");

        var handler = new JwtSecurityTokenHandler();

        try
        {
            var principal = handler.ValidateToken(token, _validationParameters, out var _);
            var userIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out var parsedId))
            {
                userId = parsedId;
                return true;
            }
        }
        catch
        {  }

        return false;
    }
}
