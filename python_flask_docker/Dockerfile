FROM python:3.12-slim

WORKDIR /app

# Обновление системы и устранение уязвимостей
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends libpq-dev gcc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Установка Python зависимостей
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir flask flask-restful flask-sqlalchemy psycopg2-binary python-dotenv gunicorn

# Установка дополнительных библиотек (только действительно необходимые)
RUN pip install --no-cache-dir numpy pandas scikit-learn pillow

# Создание структуры директорий
RUN mkdir -p /app/api /app/static /app/templates /app/models

# Создание пользователя с ограниченными правами
RUN useradd -u 1271 -r -g 0 -s /sbin/nologin \
    -c "Default Application User" flask_user

# Копирование приложения
COPY --chown=flask_user:0 . /app/

# Проверка зависимостей и исправление уязвимостей
RUN pip install --upgrade setuptools

# Смена пользователя
USER 1271

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]