FROM eclipse-temurin:21-jdk

WORKDIR /app

# Установка базовых инструментов
RUN apt-get update && apt-get install -y \
    git \
    curl \
    maven \
    && rm -rf /var/lib/apt/lists/*

# Экспозиция порта Spring Boot приложения
EXPOSE 8080

# Команда для поддержания контейнера активным
CMD ["sh", "-c", "while true; do sleep 3600; done"]