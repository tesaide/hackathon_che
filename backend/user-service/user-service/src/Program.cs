using Services.Database;
using Services.Token;
using Services.Users;
using Services.PasswordHashing;
using Services.Auth;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://0.0.0.0:80");

builder.Services.AddControllers();

builder.Services.AddScoped<ITokenPacketProcessorService, TokenPacketProcessorService>();
builder.Services.AddSingleton<IDbService>(new DbService(builder.Configuration.GetConnectionString("Postgres")!));
builder.Services.AddScoped<GetUsersService>();
builder.Services.AddScoped<AddUserService>();
builder.Services.AddScoped<IPasswordHashingService, PasswordHashingService>();

var app = builder.Build();

app.UseRouting();
app.MapControllers();

app.Run();
