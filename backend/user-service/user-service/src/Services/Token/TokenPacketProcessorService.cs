using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;

using System.Security.Claims;
using System.Security.Cryptography;

namespace Services.Token;

public class TokenPacketProcessorService : ITokenPacketProcessorService
{
    private readonly TokenValidationParameters? _validationParameters;

    private readonly bool _enabled;

    public TokenPacketProcessorService(IConfiguration config)
    {
        _enabled = bool.TryParse(config["Jwt:Enabled"], out var enabled) && enabled;

        if (!_enabled) return;

        var publicKeyPath = config["Jwt:PublicKeyPath"] ?? "public.pem";
        var validateLifetime = bool.TryParse(config["Jwt:ValidateLifetime"], out var v) && v;

        var publicKeyText = File.ReadAllText(publicKeyPath);

        var rsa = RSA.Create();
        rsa.ImportFromPem(publicKeyText.ToCharArray());

        _validationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = validateLifetime,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new RsaSecurityKey(rsa)
        };
    }

    public bool TryValidateToken(HttpRequest request, out Guid userId)
    {
        userId = Guid.Empty;

        if (!_enabled) return true;

        if (!request.Headers.TryGetValue("Authorization", out var authHeader)) return false;

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
        { }

        return false;
    }
}