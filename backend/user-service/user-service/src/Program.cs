using Services.Auth;
using Services.Database;
using Services.PasswordHashing;
using Services.Token;
using Services.Users;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://0.0.0.0:80");

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

builder.Services.AddScoped<ITokenPacketProcessorService, TokenPacketProcessorService>();
builder.Services.AddSingleton<IDbService, DbService>();
builder.Services.AddScoped<AddUserService>();
builder.Services.AddScoped<ChangeUserService>();
builder.Services.AddScoped<GetUserService>();
builder.Services.AddScoped<GetUsersService>();
builder.Services.AddScoped<IPasswordHashingService, PasswordHashingService>();

var app = builder.Build();

app.UseCors();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
