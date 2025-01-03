# User Registration Endpoint

## Endpoint
`POST /users/register`

## Description
This endpoint allows a new user to register by providing their name, email, and password.

## Request Body
The request body must be a JSON object with the following fields:
- `name` (string): The name of the user. Must be at least 3 characters long. Must be required.
- `email` (string): The email of the user. Must be a valid email address. Must be required. Must be Unique.
- `password` (string): The password of the user. Must be at least 6 characters long. Must be required.

Example:
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Response
### Success Response
Status Code: 201 Created
Body: A JSON object containing the user's token and user details.
Example:
```json
{
  "token": "jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "hashed_password_here",
    "socketId": null
  }
}
```

### Error Response
Status Code: 400 Bad Request
Body: A JSON object containing an array of error messages.
Example:
```json
{
  "errors": [
    {
      "msg": "Error message here"
    }
  ]
}
```

