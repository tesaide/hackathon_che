ЦЕ ПРИБЛИЗНА ДОКУМЕНТАЦІЯ, ЯКА ПОКАЗУЄ НАПРЯМОК РОБОТИ, НЕ СПРИЙМАТИ БУКВАЛЬНО!!!



API Gateway ендпоінти для системи "Безбар'єрний доступ України"

## 1. Користувачі та авторизація

### 1.1. Реєстрація та аутентифікація

#### `POST /api/auth/login`

**Опис**: Авторизація користувача через ID.GOV або за допомогою логіну та паролю **Параметри (body)**:

- `email` (обов'язковий, string, max 255) - Електронна пошта користувача
- `password` (обов'язковий, string, min 8) - Пароль користувача
- `gov_id_token` (опціональний, string) - Токен, отриманий від ID.GOV

**Успішна відповідь (200)**:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "fullName": "Іван Петренко",
    "role": "user",
    "verificationStatus": "verified",
    "avatarUrl": "https://storage.example.com/avatars/550e8400-e29b-41d4-a716-446655440000.jpg"
  }
}
```

**Відповідь з помилкою (401)**:

```json
{
  "error": "authentication_failed",
  "message": "Невірна електронна пошта або пароль",
  "details": null
}
```

#### `POST /api/auth/register`

**Опис**: Реєстрація нового користувача **Параметри (body)**:

- `email` (обов'язковий, string, max 255) - Електронна пошта користувача
- `password` (обов'язковий, string, min 8) - Пароль користувача
- `fullName` (обов'язковий, string, max 255) - Повне ім'я користувача
- `phone` (опціональний, string, max 20) - Номер телефону
- `govId` (опціональний, string) - Ідентифікатор від ID.GOV

**Успішна відповідь (201)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "fullName": "Іван Петренко",
  "verificationStatus": "unverified",
  "message": "Користувач успішно зареєстрований. На вашу електронну пошту надіслано лист для підтвердження."
}
```

**Відповідь з помилкою (400)**:

```json
{
  "error": "validation_error",
  "message": "Помилка валідації даних",
  "details": {
    "email": "Користувач з такою електронною поштою вже існує"
  }
}
```

#### `POST /api/auth/refresh`

**Опис**: Оновлення access token за допомогою refresh token **Параметри (body)**:

- `refreshToken` (обов'язковий, string) - Refresh token

**Успішна відповідь (200)**:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

**Відповідь з помилкою (401)**:

```json
{
  "error": "invalid_token",
  "message": "Недійсний або прострочений токен",
  "details": null
}
```

#### `GET /api/auth/callback/idgov`

**Опис**: Callback URL для авторизації через ID.GOV **Параметри (query)**:

- `code` (обов'язковий, string) - Код авторизації від ID.GOV
- `state` (обов'язковий, string) - Стан сесії для запобігання CSRF

**Успішна відповідь (200)**:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "fullName": "Іван Петренко",
    "role": "user",
    "verificationStatus": "verified",
    "avatarUrl": "https://storage.example.com/avatars/550e8400-e29b-41d4-a716-446655440000.jpg"
  }
}
```

**Відповідь з помилкою (400)**:

```json
{
  "error": "invalid_request",
  "message": "Невірні параметри запиту до ID.GOV",
  "details": null
}
```

### 1.2. Управління користувачами

#### `GET /api/users/me`

**Опис**: Отримання даних поточного автентифікованого користувача **Параметри**: Немає

**Успішна відповідь (200)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "fullName": "Іван Петренко",
  "phone": "+380991234567",
  "role": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "user"
  },
  "verificationStatus": "verified",
  "avatarUrl": "https://storage.example.com/avatars/550e8400-e29b-41d4-a716-446655440000.jpg",
  "organizationId": "550e8400-e29b-41d4-a716-446655440002",
  "createdAt": "2023-01-01T12:00:00Z",
  "lastLoginAt": "2023-01-10T15:30:00Z"
}
```

**Відповідь з помилкою (401)**:

```json
{
  "error": "unauthorized",
  "message": "Необхідно авторизуватися",
  "details": null
}
```

#### `PUT /api/users/me`

**Опис**: Оновлення даних поточного користувача **Параметри (body)**:

- `fullName` (опціональний, string, max 255) - Повне ім'я користувача
- `phone` (опціональний, string, max 20) - Номер телефону
- `password` (опціональний, string, min 8) - Новий пароль

**Успішна відповідь (200)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "fullName": "Іван Петренко",
  "phone": "+380991234567",
  "verificationStatus": "verified",
  "avatarUrl": "https://storage.example.com/avatars/550e8400-e29b-41d4-a716-446655440000.jpg",
  "updatedAt": "2023-01-15T12:30:00Z"
}
```

**Відповідь з помилкою (400)**:

```json
{
  "error": "validation_error",
  "message": "Помилка валідації даних",
  "details": {
    "password": "Пароль повинен містити мінімум 8 символів"
  }
}
```

#### `POST /api/users/avatar`

**Опис**: Завантаження аватара користувача **Параметри (multipart/form-data)**:

- `avatar` (обов'язковий, file, max 5MB) - Файл зображення

**Успішна відповідь (200)**:

```json
{
  "avatarUrl": "https://storage.example.com/avatars/550e8400-e29b-41d4-a716-446655440000.jpg"
}
```

**Відповідь з помилкою (413)**:

```json
{
  "error": "file_too_large",
  "message": "Розмір файлу перевищує допустимий ліміт (5MB)",
  "details": null
}
```

#### `GET /api/users/{userId}`

**Опис**: Отримання даних конкретного користувача (для адміністраторів) **Параметри (path)**:

- `userId` (обов'язковий, UUID) - ID користувача

**Успішна відповідь (200)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "user@example.com",
  "fullName": "Іван Петренко",
  "phone": "+380991234567",
  "role": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "user"
  },
  "verificationStatus": "verified",
  "avatarUrl": "https://storage.example.com/avatars/550e8400-e29b-41d4-a716-446655440000.jpg",
  "organizationId": "550e8400-e29b-41d4-a716-446655440002",
  "createdAt": "2023-01-01T12:00:00Z",
  "lastLoginAt": "2023-01-10T15:30:00Z",
  "isActive": true
}
```

**Відповідь з помилкою (403)**:

```json
{
  "error": "forbidden",
  "message": "Недостатньо прав для перегляду цієї інформації",
  "details": null
}
```

### 1.3. Ролі та організації

#### `GET /api/roles`

**Опис**: Отримання списку всіх ролей (для адміністраторів) **Параметри**: Немає

**Успішна відповідь (200)**:

```json
{
  "roles": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "user",
      "description": "Звичайний користувач",
      "permissions": ["view_locations", "add_locations", "add_reviews"]
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "name": "organization_admin",
      "description": "Представник організації",
      "permissions": [
        "view_locations",
        "add_locations",
        "edit_organization_locations",
        "verify_locations"
      ]
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440003",
      "name": "admin",
      "description": "Адміністратор системи",
      "permissions": ["all"]
    }
  ]
}
```

**Відповідь з помилкою (403)**:

```json
{
  "error": "forbidden",
  "message": "Недостатньо прав для перегляду цієї інформації",
  "details": null
}
```

#### `POST /api/organizations`

**Опис**: Створення нової організації **Параметри (body)**:

- `name` (обов'язковий, string, max 255) - Назва організації
- `type` (обов'язковий, enum: 'government', 'business', 'ngo') - Тип організації
- `edrpou` (обов'язковий для 'government' та 'business', string, max 15) - Код ЄДРПОУ
- `website` (опціональний, string, max 255) - Веб-сайт організації
- `verificationDocumentUrl` (опціональний, string) - Посилання на документ для верифікації

**Успішна відповідь (201)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440002",
  "name": "Департамент міського розвитку",
  "type": "government",
  "edrpou": "12345678",
  "website": "https://example.gov.ua",
  "isVerified": false,
  "verificationDocumentUrl": "https://storage.example.com/verification/550e8400-e29b-41d4-a716-446655440002.pdf",
  "createdAt": "2023-01-15T10:00:00Z"
}
```

**Відповідь з помилкою (400)**:

```json
{
  "error": "validation_error",
  "message": "Помилка валідації даних",
  "details": {
    "edrpou": "Організація з таким кодом ЄДРПОУ вже існує"
  }
}
```

#### `GET /api/organizations/{organizationId}`

**Опис**: Отримання даних конкретної організації **Параметри (path)**:

- `organizationId` (обов'язковий, UUID) - ID організації

**Успішна відповідь (200)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440002",
  "name": "Департамент міського розвитку",
  "type": "government",
  "edrpou": "12345678",
  "website": "https://example.gov.ua",
  "isVerified": true,
  "createdAt": "2023-01-15T10:00:00Z",
  "updatedAt": "2023-01-16T14:30:00Z",
  "members": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "fullName": "Іван Петренко",
      "role": "organization_admin"
    }
  ]
}
```

**Відповідь з помилкою (404)**:

```json
{
  "error": "not_found",
  "message": "Організацію не знайдено",
  "details": null
}
```

## 2. Локації та об'єкти безбар'єрності

### 2.1. Управління локаціями

#### `GET /api/locations`

**Опис**: Отримання списку локацій з фільтрацією **Параметри (query)**:

- `lat` (опціональний, number) - Широта для пошуку поблизу
- `lng` (опціональний, number) - Довгота для пошуку поблизу
- `radius` (опціональний, number, default: 5000) - Радіус пошуку в метрах
- `types` (опціональний, string) - Типи об'єктів, розділені комами
- `features` (опціональний, string) - Необхідні елементи безбар'єрності, розділені комами
- `minScore` (опціональний, number, min: 1, max: 5) - Мінімальний рейтинг доступності
- `status` (опціональний, enum: 'draft', 'pending', 'published', 'rejected') - Статус об'єкту
- `verified` (опціональний, boolean) - Чи верифікований об'єкт
- `query` (опціональний, string) - Пошуковий запит за назвою або адресою
- `page` (опціональний, number, default: 1) - Номер сторінки
- `limit` (опціональний, number, default: 20, max: 100) - Кількість об'єктів на сторінці

**Успішна відповідь (200)**:

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "name": "Міська рада",
      "address": "вул. Центральна, 10, м. Київ",
      "coordinates": {
        "lat": 50.450001,
        "lng": 30.523333
      },
      "type": "government_building",
      "category": "administration",
      "overallAccessibilityScore": 4,
      "status": "published",
      "verified": true,
      "distance": 1200,
      "accessibilityFeatures": ["ramp", "elevator", "accessible_toilet"],
      "thumbnailUrl": "https://storage.example.com/locations/550e8400-e29b-41d4-a716-446655440010/thumbnail.jpg"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440011",
      "name": "Поліклініка №5",
      "address": "вул. Медична, 15, м. Київ",
      "coordinates": {
        "lat": 50.453333,
        "lng": 30.53
      },
      "type": "healthcare",
      "category": "clinic",
      "overallAccessibilityScore": 3,
      "status": "published",
      "verified": false,
      "distance": 1500,
      "accessibilityFeatures": ["ramp"],
      "thumbnailUrl": "https://storage.example.com/locations/550e8400-e29b-41d4-a716-446655440011/thumbnail.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 156,
    "totalPages": 8
  }
}
```

**Відповідь з помилкою (400)**:

```json
{
  "error": "validation_error",
  "message": "Помилка валідації даних",
  "details": {
    "radius": "Значення має бути не більше 50000"
  }
}
```

#### `GET /api/locations/{locationId}`

**Опис**: Отримання детальної інформації про конкретну локацію **Параметри (path)**:

- `locationId` (обов'язковий, UUID) - ID локації

**Успішна відповідь (200)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "name": "Міська рада",
  "address": "вул. Центральна, 10, м. Київ",
  "coordinates": {
    "lat": 50.450001,
    "lng": 30.523333
  },
  "type": "government_building",
  "category": "administration",
  "description": "Центральна будівля міської адміністрації",
  "contacts": {
    "phone": "+380441234567",
    "email": "info@city.gov.ua",
    "website": "https://city.gov.ua"
  },
  "workingHours": {
    "monday": { "open": "09:00", "close": "18:00" },
    "tuesday": { "open": "09:00", "close": "18:00" },
    "wednesday": { "open": "09:00", "close": "18:00" },
    "thursday": { "open": "09:00", "close": "18:00" },
    "friday": { "open": "09:00", "close": "17:00" },
    "saturday": { "open": null, "close": null },
    "sunday": { "open": null, "close": null }
  },
  "organization": {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "name": "Департамент міського розвитку"
  },
  "createdBy": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullName": "Іван Петренко"
  },
  "overallAccessibilityScore": 4,
  "status": "published",
  "verified": true,
  "lastVerifiedAt": "2023-01-20T14:30:00Z",
  "accessibilityFeatures": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440020",
      "type": "ramp",
      "subtype": "street_entrance",
      "description": "Пандус при вході з вулиці",
      "status": true,
      "qualityRating": 4,
      "standardsCompliance": true,
      "photos": [
        {
          "id": "550e8400-e29b-41d4-a716-446655440030",
          "url": "https://storage.example.com/photos/550e8400-e29b-41d4-a716-446655440030.jpg",
          "thumbnailUrl": "https://storage.example.com/photos/550e8400-e29b-41d4-a716-446655440030_thumb.jpg"
        }
      ]
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440021",
      "type": "elevator",
      "subtype": "passenger",
      "description": "Ліфт для доступу на всі поверхи",
      "status": true,
      "qualityRating": 5,
      "standardsCompliance": true,
      "photos": [
        {
          "id": "550e8400-e29b-41d4-a716-446655440031",
          "url": "https://storage.example.com/photos/550e8400-e29b-41d4-a716-446655440031.jpg",
          "thumbnailUrl": "https://storage.example.com/photos/550e8400-e29b-41d4-a716-446655440031_thumb.jpg"
        }
      ]
    }
  ],
  "photos": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440032",
      "url": "https://storage.example.com/photos/550e8400-e29b-41d4-a716-446655440032.jpg",
      "thumbnailUrl": "https://storage.example.com/photos/550e8400-e29b-41d4-a716-446655440032_thumb.jpg",
      "description": "Загальний вигляд будівлі"
    }
  ],
  "reviews": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440040",
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "fullName": "Марія Коваленко"
      },
      "rating": 4,
      "comment": "Гарна доступність, але важко знайти вхід з пандусом",
      "accessibilityExperience": "Можна потрапити на всі поверхи, є доступний туалет",
      "createdAt": "2023-01-18T10:15:00Z"
    }
  ],
  "verifications": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440050",
      "verifiedBy": {
        "id": "550e8400-e29b-41d4-a716-446655440003",
        "fullName": "Олена Верифікатор"
      },
      "organization": {
        "id": "550e8400-e29b-41d4-a716-446655440004",
        "name": "ГО 'Доступний світ'"
      },
      "status": true,
      "comment": "Підтверджую наявність усіх вказаних елементів безбар'єрності",
      "isOfficial": true,
      "createdAt": "2023-01-20T14:30:00Z"
    }
  ],
  "createdAt": "2023-01-10T09:00:00Z",
  "updatedAt": "2023-01-20T14:30:00Z"
}
```

**Відповідь з помилкою (404)**:

```json
{
  "error": "not_found",
  "message": "Локацію не знайдено",
  "details": null
}
```

#### `POST /api/locations`

**Опис**: Створення нової локації **Параметри (body)**:

- `name` (обов'язковий, string, max 255) - Назва об'єкту
- `address` (обов'язковий, string, max 500) - Адреса об'єкту
- `coordinates` (обов'язковий, object) - Координати об'єкту
  - `lat` (обов'язковий, number) - Широта
  - `lng` (обов'язковий, number) - Довгота
- `type` (обов'язковий, enum) - Тип об'єкту
- `category` (опціональний, string, max 100) - Підкатегорія об'єкту
- `description` (опціональний, string) - Опис об'єкту
- `contacts` (опціональний, object) - Контактна інформація
  - `phone` (опціональний, string) - Телефон
  - `email` (опціональний, string) - Електронна пошта
  - `website` (опціональний, string) - Веб-сайт
- `workingHours` (опціональний, object) - Години роботи
- `organizationId` (опціональний, UUID) - ID організації, яка управляє об'єктом
- `status` (опціональний, enum, default: 'draft') - Статус публікації

**Успішна відповідь (201)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "name": "Міська рада",
  "address": "вул. Центральна, 10, м. Київ",
  "coordinates": {
    "lat": 50.450001,
    "lng": 30.523333
  },
  "type": "government_building",
  "category": "administration",
  "description": "Центральна будівля міської адміністрації",
  "status": "draft",
  "createdAt": "2023-01-10T09:00:00Z"
}
```

**Відповідь з помилкою (400)**:

```json
{
  "error": "validation_error",
  "message": "Помилка валідації даних",
  "details": {
    "coordinates": "Координати повинні бути в межах України"
  }
}
```

#### `PUT /api/locations/{locationId}`

**Опис**: Оновлення існуючої локації **Параметри**:

- **Path**:
  - `locationId` (обов'язковий, UUID) - ID локації
- **Body**: Ті самі параметри, що й для POST /api/locations, але всі є опціональними

**Успішна відповідь (200)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "name": "Міська рада (оновлено)",
  "address": "вул. Центральна, 10, м. Київ",
  "coordinates": {
    "lat": 50.450001,
    "lng": 30.523333
  },
  "type": "government_building",
  "category": "administration",
  "description": "Центральна будівля міської адміністрації з оновленим описом",
  "status": "pending",
  "updatedAt": "2023-01-12T15:30:00Z"
}
```

**Відповідь з помилкою (403)**:

```json
{
  "error": "forbidden",
  "message": "У вас немає прав для редагування цієї локації",
  "details": null
}
```

#### `DELETE /api/locations/{locationId}`

**Опис**: Видалення локації **Параметри (path)**:

- `locationId` (обов'язковий, UUID) - ID локації

**Успішна відповідь (200)**:

```json
{
  "message": "Локацію успішно видалено"
}
```

**Відповідь з помилкою (403)**:

```json
{
  "error": "forbidden",
  "message": "У вас немає прав для видалення цієї локації",
  "details": null
}
```

#### `PATCH /api/locations/{locationId}/status`

**Опис**: Зміна статусу локації (для модераторів) **Параметри**:

- **Path**:
  - `locationId` (обов'язковий, UUID) - ID локації
- **Body**:
  - `status` (обов'язковий, enum: 'draft', 'pending', 'published', 'rejected') - Новий статус
  - `rejectionReason` (обов'язковий, якщо status='rejected', string) - Причина відхилення

**Успішна відповідь (200)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440010",
  "status": "published",
  "updatedAt":: "2023-01-12T15:30:00Z"
}
```

### 2.2. Елементи безбар'єрності

#### `GET /api/locations/{locationId}/features`

**Опис**: Отримання списку елементів безбар'єрності для конкретної локації **Параметри (path)**:

- `locationId` (обов'язковий, UUID) - ID локації

**Успішна відповідь (200)**:

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440020",
      "type": "ramp",
      "subtype": "street_entrance",
      "description": "Пандус при вході з вулиці",
      "status": true,
      "qualityRating": 4,
      "standardsCompliance": true,
      "photos": [
        {
          "id": "550e8400-e29b-41d4-a716-446655440030",
          "url": "https://storage.example.com/photos/550e8400-e29b-41d4-a716-446655440030.jpg",
          "thumbnailUrl": "https://storage.example.com/photos/550e8400-e29b-41d4-a716-446655440030_thumb.jpg"
        }
      ],
      "createdBy": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "fullName": "Іван Петренко"
      },
      "createdAt": "2023-01-10T10:30:00Z",
      "updatedAt": "2023-01-10T10:30:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440021",
      "type": "elevator",
      "subtype": "passenger",
      "description": "Ліфт для доступу на всі поверхи",
      "status": true,
      "qualityRating": 5,
      "standardsCompliance": true,
      "photos": [
        {
          "id": "550e8400-e29b-41d4-a716-446655440031",
          "url": "https://storage.example.com/photos/550e8400-e29b-41d4-a716-446655440031.jpg",
          "thumbnailUrl": "https://storage.example.com/photos/550e8400-e29b-41d4-a716-446655440031_thumb.jpg"
        }
      ],
      "createdBy": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "fullName": "Іван Петренко"
      },
      "createdAt": "2023-01-10T11:15:00Z",
      "updatedAt": "2023-01-10T11:15:00Z"
    }
  ]
}
```

**Відповідь з помилкою (404)**:

```json
{
  "error": "not_found",
  "message": "Локацію не знайдено",
  "details": null
}
```

#### `POST /api/locations/{locationId}/features`

**Опис**: Додавання нового елементу безбар'єрності для локації **Параметри**:

- **Path**:
  - `locationId` (обов'язковий, UUID) - ID локації
- **Body**:
  - `type` (обов'язковий, enum) - Тип елементу безбар'єрності
  - `subtype` (опціональний, string, max 100) - Підтип елементу
  - `description` (опціональний, string) - Опис елементу
  - `status` (обов'язковий, boolean) - Наявність елементу
  - `qualityRating` (опціональний, integer, min: 1, max: 5) - Оцінка якості
  - `standardsCompliance` (опціональний, boolean) - Відповідність ДБН

**Успішна відповідь (201)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440022",
  "type": "accessible_toilet",
  "subtype": "ground_floor",
  "description": "Доступний туалет на першому поверсі",
  "status": true,
  "qualityRating": 4,
  "standardsCompliance": true,
  "createdBy": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullName": "Іван Петренко"
  },
  "createdAt": "2023-01-15T14:20:00Z"
}
```

**Відповідь з помилкою (400)**:

```json
{
  "error": "validation_error",
  "message": "Помилка валідації даних",
  "details": {
    "qualityRating": "Значення має бути від 1 до 5"
  }
}
```

#### `PUT /api/locations/{locationId}/features/{featureId}`

**Опис**: Оновлення існуючого елементу безбар'єрності **Параметри**:

- **Path**:
  - `locationId` (обов'язковий, UUID) - ID локації
  - `featureId` (обов'язковий, UUID) - ID елементу безбар'єрності
- **Body**: Ті самі параметри, що й для POST, але всі є опціональними

**Успішна відповідь (200)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440022",
  "type": "accessible_toilet",
  "subtype": "ground_floor",
  "description": "Доступний туалет на першому поверсі, оновлений опис",
  "status": true,
  "qualityRating": 5,
  "standardsCompliance": true,
  "updatedAt": "2023-01-16T09:45:00Z"
}
```

**Відповідь з помилкою (403)**:

```json
{
  "error": "forbidden",
  "message": "У вас немає прав для редагування цього елементу",
  "details": null
}
```

#### `DELETE /api/locations/{locationId}/features/{featureId}`

**Опис**: Видалення елементу безбар'єрності **Параметри (path)**:

- `locationId` (обов'язковий, UUID) - ID локації
- `featureId` (обов'язковий, UUID) - ID елементу безбар'єрності

**Успішна відповідь (200)**:

```json
{
  "message": "Елемент безбар'єрності успішно видалено"
}
```

**Відповідь з помилкою (403)**:

```json
{
  "error": "forbidden",
  "message": "У вас немає прав для видалення цього елементу",
  "details": null
}
```

### 2.3. Фотографії та медіа

#### `POST /api/locations/{locationId}/photos`

**Опис**: Завантаження фотографії для локації **Параметри**:

- **Path**:
  - `locationId` (обов'язковий, UUID) - ID локації
- **Form data (multipart/form-data)**:
  - `photo` (обов'язковий, file, max 10MB) - Фотографія
  - `description` (опціональний, string) - Опис фотографії
  - `featureId` (опціональний, UUID) - ID елементу безбар'єрності, до якого відноситься фото

**Успішна відповідь (201)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440033",
  "url": "https://storage.example.com/photos/550e8400-e29b-41d4-a716-446655440033.jpg",
  "thumbnailUrl": "https://storage.example.com/photos/550e8400-e29b-41d4-a716-446655440033_thumb.jpg",
  "description": "Вхід до будівлі",
  "locationId": "550e8400-e29b-41d4-a716-446655440010",
  "featureId": null,
  "moderationStatus": "pending",
  "createdBy": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullName": "Іван Петренко"
  },
  "metadata": {
    "size": 2456789,
    "width": 1920,
    "height": 1080,
    "takenAt": "2023-01-15T12:30:00Z"
  },
  "createdAt": "2023-01-16T10:10:00Z"
}
```

**Відповідь з помилкою (413)**:

```json
{
  "error": "file_too_large",
  "message": "Розмір файлу перевищує допустимий ліміт (10MB)",
  "details": null
}
```

#### `DELETE /api/photos/{photoId}`

**Опис**: Видалення фотографії **Параметри (path)**:

- `photoId` (обов'язковий, UUID) - ID фотографії

**Успішна відповідь (200)**:

```json
{
  "message": "Фотографію успішно видалено"
}
```

**Відповідь з помилкою (403)**:

```json
{
  "error": "forbidden",
  "message": "У вас немає прав для видалення цієї фотографії",
  "details": null
}
```

#### `PATCH /api/photos/{photoId}/moderate`

**Опис**: Модерація фотографії (для модераторів) **Параметри**:

- **Path**:
  - `photoId` (обов'язковий, UUID) - ID фотографії
- **Body**:
  - `moderationStatus` (обов'язковий, enum: 'approved', 'rejected') - Статус модерації
  - `rejectReason` (обов'язковий, якщо moderationStatus='rejected', string) - Причина відхилення

**Успішна відповідь (200)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440033",
  "moderationStatus": "approved",
  "updatedAt": "2023-01-16T14:15:00Z"
}
```

**Відповідь з помилкою (403)**:

```json
{
  "error": "forbidden",
  "message": "У вас немає прав для модерації фотографій",
  "details": null
}
```

### 2.4. Відгуки та оцінки

#### `GET /api/locations/{locationId}/reviews`

**Опис**: Отримання списку відгуків для локації **Параметри**:

- **Path**:
  - `locationId` (обов'язковий, UUID) - ID локації
- **Query**:
  - `page` (опціональний, number, default: 1) - Номер сторінки
  - `limit` (опціональний, number, default: 10, max: 50) - Кількість відгуків на сторінці

**Успішна відповідь (200)**:

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440040",
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "fullName": "Марія Коваленко",
        "avatarUrl": "https://storage.example.com/avatars/550e8400-e29b-41d4-a716-446655440001.jpg"
      },
      "rating": 4,
      "comment": "Гарна доступність, але важко знайти вхід з пандусом",
      "accessibilityExperience": "Можна потрапити на всі поверхи, є доступний туалет",
      "createdAt": "2023-01-18T10:15:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440041",
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440005",
        "fullName": "Петро Сидоренко",
        "avatarUrl": "https://storage.example.com/avatars/550e8400-e29b-41d4-a716-446655440005.jpg"
      },
      "rating": 5,
      "comment": "Чудова доступність, зручний заїзд на візку",
      "accessibilityExperience": "Повністю доступна будівля, привітний персонал",
      "createdAt": "2023-01-19T15:40:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 8,
    "totalPages": 1
  }
}
```

**Відповідь з помилкою (404)**:

```json
{
  "error": "not_found",
  "message": "Локацію не знайдено",
  "details": null
}
```

#### `POST /api/locations/{locationId}/reviews`

**Опис**: Додавання нового відгуку для локації **Параметри**:

- **Path**:
  - `locationId` (обов'язковий, UUID) - ID локації
- **Body**:
  - `rating` (обов'язковий, integer, min: 1, max: 5) - Оцінка
  - `comment` (опціональний, string) - Коментар
  - `accessibilityExperience` (опціональний, string) - Опис досвіду доступності

**Успішна відповідь (201)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440042",
  "rating": 4,
  "comment": "Загалом доступний об'єкт, але пандус зроблений не дуже зручно",
  "accessibilityExperience": "Є труднощі з користуванням пандусом через його крутизну",
  "moderationStatus": "pending",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "fullName": "Іван Петренко"
  },
  "createdAt": "2023-01-20T11:25:00Z"
}
```

**Відповідь з помилкою (400)**:

```json
{
  "error": "validation_error",
  "message": "Помилка валідації даних",
  "details": {
    "rating": "Значення має бути від 1 до 5"
  }
}
```

#### `DELETE /api/reviews/{reviewId}`

**Опис**: Видалення відгуку **Параметри (path)**:

- `reviewId` (обов'язковий, UUID) - ID відгуку

**Успішна відповідь (200)**:

```json
{
  "message": "Відгук успішно видалено"
}
```

**Відповідь з помилкою (403)**:

```json
{
  "error": "forbidden",
  "message": "У вас немає прав для видалення цього відгуку",
  "details": null
}
```

### 2.5. Верифікація локацій

#### `POST /api/locations/{locationId}/verifications`

**Опис**: Додавання верифікації (підтвердження або спростування) для локації **Параметри**:

- **Path**:
  - `locationId` (обов'язковий, UUID) - ID локації
- **Body**:
  - `status` (обов'язковий, boolean) - Підтвердження (true) або спростування (false)
  - `comment` (опціональний, string) - Коментар верифікатора
  - `evidencePhotoId` (опціональний, UUID) - ID фото, що підтверджує верифікацію
  - `featureId` (опціональний, UUID) - ID конкретного елементу, якщо верифікація стосується тільки його

**Успішна відповідь (201)**:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440051",
  "status": true,
  "comment": "Підтверджую наявність усіх вказаних елементів безбар'єрності",
  "evidencePhotoId": "550e8400-e29b-41d4-a716-446655440033",
  "featureId": null,
  "verifiedBy": {
    "id": "550e8400-e29b-41d4-a716-446655440003",
    "fullName": "Олена Верифікатор"
  },
  "organization": {
    "id": "550e8400-e29b-41d4-a716-446655440004",
    "name": "ГО 'Доступний світ'"
  },
  "isOfficial": true,
  "createdAt": "2023-01-20T14:30:00Z"
}
```

**Відповідь з помилкою (403)**:

```json
{
  "error": "forbidden",
  "message": "У вас немає прав для верифікації локацій",
  "details": null
}
```

#### `GET /api/locations/{locationId}/verifications`

**Опис**: Отримання списку верифікацій для локації **Параметри**:

- **Path**:
  - `locationId` (обов'язковий, UUID) - ID локації

**Успішна відповідь (200)**:

```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440050",
      "status": true,
      "comment": "Підтверджую наявність усіх вказаних елементів безбар'єрності",
      "evidencePhoto": {
        "id": "550e8400-e29b-41d4-a716-446655440030",
        "url": "https://storage.example.com/photos/550e8400-e29b-41d4-a716-446655440030.jpg",
        "thumbnailUrl": "https://storage.example.com/photos/550e8400-e29b-41d4-a716-446655440030_thumb.jpg"
      },
      "featureId": null,
      "verifiedBy": {
        "id": "550e8400-e29b-41d4-a716-446655440003",
        "fullName": "Олена Верифікатор"
      },
      "organization": {
        "id": "550e8400-e29b-41d4-a716-446655440004",
        "name": "ГО 'Доступний світ'"
      },
      "isOfficial": true,
      "createdAt": "2023-01-20T14:30:00Z"
    }
  ]
}
```

**Відповідь з помилкою (404)**:

```json
{
  "error": "not_found",
  "message": "Локацію не знайдено",
  "details": null
}
```

## 3. Сповіщення та комунікація

### 3.1. Сповіщення

#### `GET /api/notifications`

**Опис**: Отримання списку сповіщень
