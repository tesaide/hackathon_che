namespace UserService.Models;

public class Packet
{
    public Dictionary<string, string> Headers { get; set; } = new();

    public string Body { get; set; } = string.Empty;
}
