# 🛡️ User Service API

Проєкт розроблений на **C# (.NET 8)** з використанням **ASP.NET Core Web API**, **Kestrel**, **PostgreSQL**, **JWT-аутентифікації**, контейнеризований у **Docker**.

## 🔐 Загальні вимоги до запитів

Кожен запит до API повинен містити заголовок авторизації з JWT-токеном:

### 🔸 Authorization Header

```http
Authorization: Bearer <token>
```

## 🔴 Помилки

### 401 Unauthorized

```json
{
  "message": "Unautorized error"
}
```

### 500 Internal Server Error

```json
{
  "message": "Internal error",
  "error": "<exception_message>"
}
```

## 📘 Ендпоїнти

### ✅ POST /api/admin/get_users

Отримання **всіх користувачів** з бази.

#### 🔹 Request Body

```json
null
```

#### 🔹 Response 200 OK

```json
{
  "users": [
    {
      "id": "<uuid>",
      "createdAt": "<timestamp>",
      "updatedAt": "<timestamp>",
      "lastLoginAt": "<timestamp|null>",
      "isActive": "<bool>",
      "password": "<base64 string>",
      "roleId": "<uuid>",
      "verificationStatus": "<string>",
      "organizationId": "<uuid>",
      "email": "<string>",
      "fullName": "<string>",
      "phone": "<string>",
      "avatarUrl": "<string>",
      "govId": "<string>"
    }
  ]
}
```

### ✅ POST /api/admin/get_user

Отримання **одного користувача** по `id`.

#### 🔹 Request Body

```json
{
  "id": "<uuid>"
}
```

#### 🔹 Response 200 OK

```json
{
  "createdUser": {
    "id": "<uuid>",
    "createdAt": "<timestamp>",
    "updatedAt": "<timestamp>",
    "lastLoginAt": "<timestamp|null>",
    "isActive": "<bool>",
    "password": "<base64 string>",
    "roleId": "<uuid>",
    "verificationStatus": "<string>",
    "organizationId": "<uuid>",
    "email": "<string>",
    "fullName": "<string>",
    "phone": "<string>",
    "avatarUrl": "<string>",
    "govId": "<string>"
  }
}
```

### ✅ POST /api/admin/user_add

Додавання **нового користувача**.

#### 🔹 Request Body

```json
{
  "fullName": "<string>",
  "email": "<string>",
  "password": "<string>"
}
```

#### 🔹 Response 200 OK

```json
{
  "user": [
    {
      "id": "<uuid>",
      "createdAt": "<timestamp>",
      "updatedAt": "<timestamp>",
      "lastLoginAt": "<timestamp|null>",
      "isActive": "<bool>",
      "password": "<base64 string>",
      "roleId": "<uuid>",
      "verificationStatus": "<string>",
      "organizationId": "<uuid>",
      "email": "<string>",
      "fullName": "<string>",
      "phone": "<string>",
      "avatarUrl": "<string>",
      "govId": "<string>"
    }
  ]
}
```

#### 🔻 Помилки

##### 400 Bad Request

```json
{
  "message": "Full name is required"
}
```

```json
{
  "message": "Email is required"
}
```

```json
{
  "message": "Password is required"
}
```

##### 409 Conflict

```json
{
  "message": "Email already exists"
}
```

### ✅ POST /api/admin/user_change

Зміна **даних користувача** за `id`.

#### 🔹 Request Body

```json
{
  "id": "<uuid>",
  "createdAt": "<timestamp>",
  "updatedAt": "<timestamp>",
  "lastLoginAt": "<timestamp|null>",
  "isActive": "<bool>",
  "password": "<base64 string>",
  "roleId": "<uuid>",
  "verificationStatus": "<string>",
  "organizationId": "<uuid>",
  "email": "<string>",
  "fullName": "<string>",
  "phone": "<string>",
  "avatarUrl": "<string>",
  "govId": "<string>"
}
```

#### 🔹 Response 200 OK

```json
{
  "message": "Ok"
}
```

## 📦 Технології

- C# / .NET 8
- ASP.NET Core Web API
- PostgreSQL
- JWT (RS256)
- Docker
- Kestrel