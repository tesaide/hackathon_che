FROM python:3.12-slim

WORKDIR /app

# Установка зависимостей
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir flask flask-restful flask-sqlalchemy psycopg2-binary python-dotenv gunicorn

# Установка дополнительных зависимостей для работы с геоданными и AI
RUN pip install --no-cache-dir geopandas shapely numpy pandas scikit-learn pillow spacy

# Создание каталогов для приложения
RUN mkdir -p /app/api /app/static /app/templates /app/models

# Копирование файлов приложения
COPY . /app/

# Порт для Flask
EXPOSE 5000

# Команда для запуска приложения
CMD ["flask", "run", "--host=0.0.0.0"]