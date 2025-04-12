using UserService.Services;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://0.0.0.0:80");

builder.Services.AddControllers();
builder.Services.AddScoped<ITokenPacketProcessorService, TokenPacketProcessorService>();

var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.Run();
