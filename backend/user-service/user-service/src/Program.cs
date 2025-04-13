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
            .WithOrigins(
                "http://192.168.88.51:5173",
                "http://localhost:5173",          
                "http://192.168.88.51:80",
                "http://localhost:80"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

builder.Services.AddScoped<ITokenPacketProcessorService, TokenPacketProcessorService>();
builder.Services.AddSingleton<IDbService>(new DbService(builder.Configuration.GetConnectionString("Postgres")!));
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
