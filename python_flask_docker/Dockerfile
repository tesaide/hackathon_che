# Этап сборки
FROM python:3.12 AS builder

WORKDIR /app

# Установка всех необходимых зависимостей
RUN pip install --no-cache-dir --upgrade pip wheel setuptools
RUN pip install --no-cache-dir --user flask flask-restful flask-sqlalchemy psycopg2-binary python-dotenv gunicorn
RUN pip install --no-cache-dir --user numpy pandas scikit-learn pillow

# Финальный этап
FROM python:3.12-slim

WORKDIR /app

# Копирование только Python пакетов из предыдущего этапа
COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

# Создание структуры директорий
RUN mkdir -p /app/api /app/static /app/templates /app/models

# Создание пользователя
RUN useradd -u 1271 -r -g 0 -s /sbin/nologin -c "Default Application User" flask_user

# Копирование приложения
COPY --chown=flask_user:0 . /app/

# Переключение на непривилегированного пользователя
USER 1271

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]