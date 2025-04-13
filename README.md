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
   git clone [https://github.com/tesaide/hackathon_che.git](https://github.com/tesaide/hackathon_che.git)
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
```

# java_authentication

## Що входить до складу

- OpenJDK 8 (slim) – легкий образ Java для запуску Spring-додатків
- Maven – для збірки проєкту
- Docker Compose – для зручного керування сервісом
- Попередньо створений користувач із UID 1331
- Налаштоване середовище для запуску та дебагу Java-додатків

## Як використовувати

### Запуск за допомогою Docker Compose

1. Клонуйте репозиторій:
   ```bash
   git clone <URL>
   cd <назва-папки>
   ```

2. Запустіть контейнер:
   ```bash
   docker compose up -d
   ```

### Налаштування

- `container_name` - ім'я контейнера — `java-spring-app`
- `volumes` - поточна директорія монтується в контейнер у `/app`
- `ports` - проброс порту `8080` з хоста в контейнер
- `restart` - контейнер автоматично перезапускається при збої
- `networks` - окрема bridge-мережа `java_network`

# java_location

## Що входить до складу

- Eclipse Temurin JDK 21 – сучасна та продуктивна версія Java
- Maven – система зборки Java-проєктів
- Git і Curl – для отримання коду та мережевих запитів
- Docker Compose – для керування контейнером Spring Boot
- Створений користувач із UID 1231 для безпечного виконання коду

## Як використовувати

### Запуск через Docker Compose

1. Клонуйте репозиторій:
   ```bash
   git clone <URL>
   cd <назва-папки>
   ```

2. Запустіть контейнер:
   ```bash
   docker compose up -d
   ```

### Налаштування

- `container_name` - `java21-spring-app`
- `volumes` - монтується локальна папка в `/app`
- `ports` - `8081` (хост) → `8080` (контейнер)
- `networks` - окрема ізольована мережа `java21_network`
- `restart` - `unless-stopped`: контейнер перезапускається при збої

# MinIO Docker Container

Цей контейнер запускає MinIO сервер для зберігання об'єктів.

## Запуск контейнера

Для запуску контейнера скористайтеся наступною командою:

```bash
docker run -d --name minio \
  -p 9000:9000 \
  -p 9001:9001 \
  -e "MINIO_ROOT_USER=minioadmin" \
  -e "MINIO_ROOT_PASSWORD=minioadmin123" \
  -v ~/minio-data:/data \
  quay.io/minio/minio server /data --console-address ":9001"
```

### Опис параметрів

-   `-d`: Запуск контейнера в фоновому режимі (detached).
-   `--name minio`: Присвоєння контейнеру імені "minio".
-   `-p 9000:9000`: Порт 9000 хост-машини відображається на порт 9000 контейнера (для доступу до API).
-   `-p 9001:9001`: Порт 9001 хост-машини відображається на порт 9001 контейнера (для консолі MinIO).
-   `-e "MINIO_ROOT_USER=minioadmin"`: Встановлення імені користувача адміністратора MinIO.
-   `-e "MINIO_ROOT_PASSWORD=minioadmin123"`: Встановлення пароля адміністратора MinIO.
-   `-v ~/minio-data:/data`: Монтування директорії `~/minio-data` на хост-машині в директорію `/data` контейнера для зберігання даних MinIO.
-   `quay.io/minio/minio server /data --console-address ":9001"`: Запуск MinIO сервера з консоллю на порту 9001.

## Підключення за допомогою Python (boto3)

Приклад підключення до MinIO сервера за допомогою бібліотеки `boto3` в Python:

```python
import boto3

s3 = boto3.client(
    's3',
    endpoint_url='[http://192.168.88.54:9000](http://192.168.88.54:9000)',
    aws_access_key_id='minioadmin',
    aws_secret_access_key='minioadmin123',
)

# Список бакетів (якщо є)
print(s3.list_buckets())
```

### Зауваження

-   Замініть `192.168.88.54` на IP-адресу вашого MinIO сервера.
-   Переконайтеся, що `boto3` встановлений (`pip install boto3`).

## Доступ до консолі MinIO

Консоль MinIO доступна за адресою `http://<IP-адреса>:9001` у вашому браузері. Використовуйте `minioadmin` як ім'я користувача та `minioadmin123` як пароль.


Цей README.md надає базову інформацію про проект, інструкції по запуску та настройці, а також опис файлів, які входять до складу. Ви можете адаптувати його під ваші потреби, якщо потрібно додати якісь конкретні деталі проекту.
 
