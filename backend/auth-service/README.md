# City

## API Endpoints

### POST /api/login
Login person by login (email) and password. Returns an error if the password is wrong or such a user doesn't exist.
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
Refresh the user's tokens. Returns an error if the user is deleted, or the refreshToken is invalid.
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


