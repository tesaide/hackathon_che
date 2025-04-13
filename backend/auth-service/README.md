# City

## API Endpoints

### POST /api/login
**Request Body:**
```json
{
  "login": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "accessToken": "string",
  "refreshToken": "string"
}
```

### POST /api/login/refresh
**Request Body:**
```json
{
  "refreshToken": "string"
}
```

**Response:**
```json
{
  "accessToken": "string",
  "refreshToken": "string"
}
```

## Описание

Эти эндпоинты позволяют пользователям аутентифицироваться и обновлять токены доступа.
