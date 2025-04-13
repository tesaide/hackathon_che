### Опис проєкту 

Проєкт було написано на c# з використанням .NET, ASP.NET Core Web API, Kestrel, PostgreSQL, JWT, Docker 

### ЩО ПОВИННО БУТИ В КОЖНОМУ ЗАПИТІ

**Header**

```application/json
Authorization: Bearer <token>
```

**Unautorized error (401)**:

```json
{
  "message": "Unautorized error",
}
```

**Internal error (500)**:

```json
{
  "message": "Internal error",
  "error": "<exception_message>"
}
```

#### `GET /api/admin/get_users`

**Опис**: Отримання даних всіх користувачів

### Request

**Body**: 
```application/json
Null
```

**Success (200)**:

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

#### `GET /api/admin/get_user`

**Опис**: Отримання даних одного користувача

### Request

**Body**: 
```json
{
  "id": "<uuid>"
}
```
**Success (200)**:

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

#### `POST /api/admin/add_user`

**Опис**: Додавання нового користувача 

### Request

**Body**

```json
{
  "fullName": "<string>",
  "email": "<string>",
  "password": "<string>",
}
```

**Success (200)**:

```json
{
  "user": [
    {
      "id": "<uuid>",
      "created_at": "<timestamp>",
      "updated_at": "<timestamp>",
      "last_login_at": "<timestamp|null>",
      "is_active": "<bool>",
      "password": "<bytea>",
      "role_id": "<uuid>",
      "verification_status": "<string>",
      "organization_id": "<uuid>",
      "email": "<string>",
      "fullName": "<string>",
      "phone": "<string>",
      "avatar_url": "<string>",
      "gov_id": "<string>"
    }
  ]
}
```

**Bad Request (400)**:

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

**Conflict (409)**:

```json
{
  "message": "Email already exists"
}
```