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
   cd Hackathon
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


# React Native з Expo у Docker

## Використані версії

- Expo: ~52.0.43
- React: 18.3.1
- React Native: 0.76.9
- Expo Status Bar: ~2.0.1

## Початок роботи

### 1. Запуск контейнера

```bash
docker compose up -d
```

# Python Flask API 

Цей Docker-контейнер містить середовище розробки для Python 3.12 з Flask

## Технології та бібліотеки

- **Python 3.12**: Сучасна версія інтерпретатора Python
- **Flask**: Легкий та гнучкий веб-фреймворк
- **Flask-RESTful**: Розширення для створення REST API
- **Flask-SQLAlchemy**: ORM для роботи з базами даних
- **psycopg2-binary**: Драйвер PostgreSQL
- **Геопросторові бібліотеки**: geopandas, shapely
- **Аналіз даних та AI**: numpy, pandas, scikit-learn
- **Обробка зображень**: pillow
- **NLP**: spacy (для української мови)


### Запуск контейнера

```bash
docker compose up -d
```

## Тестування API

### Перевірка базового URL

```bash
curl http://localhost:5050/

Цей README.md надає базову інформацію про проект, інструкції по запуску та настройці, а також опис файлів, які входять до складу. Ви можете адаптувати його під ваші потреби, якщо потрібно додати якісь конкретні деталі проекту.
