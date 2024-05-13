## Peer Rating App API Documentation

### Base URL

```
http://localhost:3000
```

### Endpoints

#### 1. Register User

**Endpoint:** `/auth/register`

**Method:** `POST`

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "message": "User registered"
}
```

**cURL Request:**

```sh
curl -X POST http://localhost:3000/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "john_doe",
  "password": "password123"
}'
```

#### 2. Login User

**Endpoint:** `/auth/login`

**Method:** `POST`

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "token": "jwt_token"
}
```

**cURL Request:**

```sh
curl -X POST http://localhost:3000/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username": "john_doe",
  "password": "password123"
}'
```

#### 3. Rate a Peer

**Endpoint:** `/ratings/rate`

**Method:** `POST`

**Headers:**

```http
Authorization: Bearer jwt_token
Content-Type: application/json
```

**Request Body:**

```json
{
  "rateeId": "string",
  "rating": "number",
  "feedback": "string"
}
```

**Response:**

```json
{
  "message": "Rating submitted"
}
```

**cURL Request:**

```sh
curl -X POST http://localhost:3000/ratings/rate \
-H "Authorization: Bearer jwt_token" \
-H "Content-Type: application/json" \
-d '{
  "rateeId": "user_id",
  "rating": 4,
  "feedback": "Great work!"
}'
```

#### 4. Get Feedback for a User

**Endpoint:** `/ratings/feedback/:userId`

**Method:** `GET`

**Headers:**

```http
Authorization: Bearer jwt_token
```

**Response:**

```json
[
  {
    "rater": {
      "_id": "string",
      "username": "string"
    },
    "ratee": "string",
    "rating": "number",
    "feedback": "string"
  }
]
```

**cURL Request:**

```sh
curl -X GET http://localhost:3000/ratings/feedback/user_id \
-H "Authorization: Bearer jwt_token"
```

#### 5. Get List of Users

**Endpoint:** `/users/list`

**Method:** `GET`

**Response:**

```json
[
  {
    "_id": "string",
    "username": "string",
    "averageRating": "number"
  }
]
```

**cURL Request:**

```sh
curl -X GET http://localhost:3000/users/list
```

#### 6. Get User Profile

**Endpoint:** `/users/profile/:userId`

**Method:** `GET`

**Response:**

```json
{
  "_id": "string",
  "username": "string",
  "averageRating": "number"
}
```

**cURL Request:**

```sh
curl -X GET http://localhost:3000/users/profile/user_id
```

This documentation should help you interact with your API endpoints effectively. Make sure to replace placeholder values like `jwt_token`, `user_id`, and others with actual values.
