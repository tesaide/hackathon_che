using Services.Database;
using Services.Token;
using Services.Users;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://0.0.0.0:80");

builder.Services.AddControllers();
builder.Services.AddScoped<ITokenPacketProcessorService, TokenPacketProcessorService>();
builder.Services.AddSingleton<IDbService>(new DbService(builder.Configuration.GetConnectionString("Postgres")!));
builder.Services.AddScoped<UserDataService>();

var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.Run();
