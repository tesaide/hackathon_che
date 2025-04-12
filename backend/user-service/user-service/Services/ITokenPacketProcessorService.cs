namespace UserService.Services;

public interface ITokenPacketProcessorService
{
    bool TryValidateToken(HttpRequest request, out Guid userId);
}