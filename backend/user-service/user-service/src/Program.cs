using Services.Auth;
using Services.Database;
using Services.PasswordHashing;
using Services.Token;
using Services.Users;

var builder = WebApplication.CreateBuilder(args);

// Слушать на порту 80 (0.0.0.0 — на всех интерфейсах, включая Docker)
builder.WebHost.UseUrls("http://0.0.0.0:80");

// Настройка CORS: разрешён только конкретный адрес
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .WithOrigins("http://192.168.88.26:25565") // IP Docker-фронта
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddControllers();

// DI-сервисы
builder.Services.AddScoped<ITokenPacketProcessorService, TokenPacketProcessorService>();
builder.Services.AddSingleton<IDbService>(new DbService(builder.Configuration.GetConnectionString("Postgres")!));
builder.Services.AddScoped<AddUserService>();
builder.Services.AddScoped<ChangeUserService>();
builder.Services.AddScoped<GetUserService>();
builder.Services.AddScoped<GetUsersService>();
builder.Services.AddScoped<IPasswordHashingService, PasswordHashingService>();

var app = builder.Build();

app.UseCors(); // подключаем CORS

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
