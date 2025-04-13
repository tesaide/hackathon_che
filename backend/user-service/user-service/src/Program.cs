using Services.Database;
using Services.Token;
using Services.Users;
using Services.PasswordHashing;
using Services.Auth;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://0.0.0.0:80");

// 🔓 CORS — разрешаем вообще всё и обрабатываем OPTIONS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
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

// 🔥 Обязательно до маршрутов
app.UseCors();

// 🚦 Включаем маршрутизацию
app.UseRouting();

// 👇 Это позволяет .NET автоматически обрабатывать OPTIONS-запросы
app.UseAuthorization();

app.MapControllers();

app.Run();
