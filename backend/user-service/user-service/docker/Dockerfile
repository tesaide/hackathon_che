FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ./src/ .
RUN dotnet publish -c Release -o /app

RUN useradd -u 8571 -r -g -0 -s /sbin/nologin \
    -c "Default Application User" postgres

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .

COPY ./keys/public.pem ./public.pem

USER 8571

ENTRYPOINT ["dotnet", "app.dll"]
