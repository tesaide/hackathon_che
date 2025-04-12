FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /app

# Установка необходимых инструментов
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Открытие порта для API
EXPOSE 5000
EXPOSE 5001

# Настройка для запуска без HTTPS в режиме разработки
ENV ASPNETCORE_URLS=http://+:5000

# Создаем проект при запуске контейнера, если его еще нет
CMD if [ ! -f /app/AccessibilityApi/AccessibilityApi.csproj ]; then \
      dotnet new webapi -n AccessibilityApi && \
      cp -r AccessibilityApi/* /app/ && \
      rm -rf AccessibilityApi; \
    fi && \
    cd /app && \
    dotnet watch run --urls "http://0.0.0.0:5000"