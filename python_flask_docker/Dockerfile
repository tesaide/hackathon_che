FROM python:3.12-alpine

WORKDIR /app

# Установка необходимых системных зависимостей
RUN apk add --no-cache postgresql-libs

# Установка зависимостей для сборки
RUN apk add --no-cache --virtual .build-deps \
    gcc \
    musl-dev \
    postgresql-dev \
    && pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir flask flask-restful flask-sqlalchemy psycopg2-binary python-dotenv gunicorn \
    && pip install --no-cache-dir numpy pandas scikit-learn pillow \
    && apk del .build-deps

# Создание структуры директорий
RUN mkdir -p /app/api /app/static /app/templates /app/models

# Настройка пользователя
RUN adduser -D -u 1271 appuser

# Копирование приложения
COPY --chown=appuser:appuser . /app/

# Переключение на непривилегированного пользователя
USER appuser

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]