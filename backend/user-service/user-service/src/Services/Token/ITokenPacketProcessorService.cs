namespace Services.Token;

public interface ITokenPacketProcessorService
{
    bool TryValidateToken(HttpRequest request, out Guid userId);
}