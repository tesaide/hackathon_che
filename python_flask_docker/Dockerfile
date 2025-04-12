# Використовуємо останню безпечну версію Python на основі Debian Bookworm
FROM python:3.12.2-slim-bookworm

# Встановлюємо змінні середовища для Python
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Встановлюємо необхідні системні пакети (без зайвих залежностей)
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    libffi-dev \
    libssl-dev \
    zlib1g \
    libpq-dev \
    curl \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Створюємо некореневого користувача з фіксованим UID для безпеки
RUN useradd -u 1271 -r -g 0 -s /sbin/nologin -c "App User" appuser

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо файл з залежностями (створи requirements.txt окремо!)
COPY requirements.txt .

# Встановлюємо pip-залежності
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Копіюємо весь код у контейнер
COPY . .

# Змінюємо користувача на некореневого
USER 1271

# Відкриваємо порт для Flask (5000)
EXPOSE 5000

# Команда за замовчуванням (заміни на gunicorn або інше при потребі)
CMD ["flask", "run", "--host=0.0.0.0"]
