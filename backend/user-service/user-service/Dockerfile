FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
COPY public.pem /app/public.pem
ENV ASPNETCORE_URLS=http://+:80
ENTRYPOINT ["dotnet", "user-service.dll"]
