using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

var app = WebApplication.Create(args);
app.MapGet("/", () => "Hello from Kestrel!");
app.Run();
