# hackathon_che

# PostgreSQL 17 з підтримкою PostGIS

## Що входить до складу

- PostgreSQL 17 
- PostGIS 3.4 - розширення для роботи з географічними об'єктами та просторовими даними
- Скрипти ініціалізації для автоматичного налаштування PostGIS
- Docker Compose конфігурація 

## Як використовувати

### Запуск за допомогою Docker Compose

1. Клонуйте репозиторій:
   ```bash
   git clone https://github.com/tesaide/hackathon_che.git
   cd docker_postgre
   ```

2. Запустіть контейнер:
   ```bash
   docker compose up -d
   ```

3. Підключіться до бази даних:
   ```bash
   psql -h localhost -U postgres -d geodatabase
   ```
   Пароль: `post_hack` 

### Налаштування

У файлі `compose.yaml` 
- `POSTGRES_USER`: ім'я користувача (за замовчуванням `postgres`)
- `POSTGRES_PASSWORD`: пароль (за замовчуванням `post_hack`)
- `POSTGRES_DB`: назва бази даних (за замовчуванням `geodatabase`)
- Порт підключення (за замовчуванням `5432`)

## Опис файлів

- `Dockerfile` - інструкції для створення власного образу PostgreSQL з PostGIS
- `compose.yaml` - конфігурація Docker Compose для запуску контейнера
- `initdb-postgis.sh` - скрипт ініціалізації PostGIS при першому запуску
- `update-postgis.sh` - скрипт для оновлення версії PostGIS


Цей README.md надає базову інформацію про проект, інструкції по запуску та настройці, а також опис файлів, які входять до складу. Ви можете адаптувати його під ваші потреби, якщо потрібно додати якісь конкретні деталі проекту.
