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

# User Login Endpoint

## Endpoint
`POST /users/login`

## Description
This endpoint allows an existing user to log in by providing their email and password.

## Request Body
The request body must be a JSON object with the following fields:
- `email` (string): The email of the user. Must be a valid email address.
- `password` (string): The password of the user. Must be at least 6 characters long.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Response
### Success Response
Status Code: 200 OK

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

Status Code: 401 Unauthorized

Body: A JSON object contaning the error messages.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid Credentials"
    }
  ]
}
```

# User Profile Endpoint

## Endpoint
`GET /users/profile`

## Description
This endpoint allows an authenticated user to retrieve their profile information.

## Response
### Success Response
Status Code: 200 OK

Body: A JSON object containing the user's profile information.

Example:
```json
{
  "_id": "user_id_here",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "hashed_password_here",
  "socketId": null
}
```

### Error Response
Status Code: 401 Unauthorized

Body: A JSON object contaning the error messages.

Example:
```json
{
  "errors": [
    {
      "msg": "Unauthorized"
    }
  ]
}
```
# User Logout Endpoint

## Endpoint
`GET /users/logout`

## Description
This endpoint allows an authenticated user to log out by clearing their authentication token.


## Response
### Success Response
Status Code: 200 OK

Body: A JSON object confirming the logout.

Example:
```json
{
  "msg": "Logged out successfully"
}
```

### Error Response
Status Code: 401 Unauthorized

Body: A JSON object contaning the error messages.

Example:
```json
{
  "errors": [
    {
      "msg": "Unauthorized"
    }
  ]
}
```

# Driver Registration Endpoint

## Endpoint
`POST /driver/register`

## Description
This endpoint allows a new driver to register by providing their name, email, password, vehicle type, and number plate.

## Request Body
The request body must be a JSON object with the following fields:
- `name` (string): The name of the driver. Must be at least 3 characters long.
- `email` (string): The email of the driver. Must be a valid email address.
- `password` (string): The password of the driver. Must be at least 6 characters long.
- `vehicle.type` (string): The type of the vehicle. Must be one of `car`, `moto`, or `auto`.
- `vehicle.numberPlate` (string): The number plate of the vehicle.

Example:
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "type": "car",
    "numberPlate": "ABC123"
  }
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
  "driver": {
    "_id": "driver_id_here",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "password": "hashed_password_here",
    "vehicle": {
      "type": "car",
      "numberPlate": "ABC123"
    },
    "isAvailable": false,
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
# Driver Login Endpoint

## Endpoint
`POST /driver/login`

## Description
This endpoint allows an existing driver to log in by providing their email and password.

## Request Body
The request body must be a JSON object with the following fields:
- `email` (string): The email of the user. Must be a valid email address.
- `password` (string): The password of the user. Must be at least 6 characters long.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Response
### Success Response
Status Code: 200 OK

Body: A JSON object containing the driver's token and driver details.

Example:
```json
{
  "token": "jwt_token_here",
  "driver": {
    "_id": "driver_id_here",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "password": "hashed_password_here",
    "vehicle": {
      "type": "car",
      "numberPlate": "ABC123"
    },
    "isAvailable": false,
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

Status Code: 401 Unauthorized

Body: A JSON object contaning the error messages.

Example:
```json
{
  "errors": [
    {
      "msg": "Invalid Credentials"
    }
  ]
}
```

# Driver Profile Endpoint

## Endpoint
`GET /driver/profile`

## Description
This endpoint allows an authenticated driver to retrieve their profile information.

## Response
### Success Response
Status Code: 200 OK

Body: A JSON object containing the driver's profile information.

Example:
```json
{
  "_id": "driver_id_here",
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "hashed_password_here",
  "vehicle": {
    "type": "car",
    "numberPlate": "ABC123"
  },
  "isAvailable": false,
  "socketId": null
}
```

### Error Response
Status Code: 401 Unauthorized

Body: A JSON object contaning the error messages.

Example:
```json
{
  "errors": [
    {
      "msg": "Unauthorized"
    }
  ]
}
```
# Driver Logout Endpoint

## Endpoint
`GET /driver/logout`

## Description
This endpoint allows an authenticated driver to log out by clearing their authentication token.


## Response
### Success Response
Status Code: 200 OK

Body: A JSON object confirming the logout.

Example:
```json
{
  "msg": "Logged out successfully"
}
```

### Error Response
Status Code: 401 Unauthorized

Body: A JSON object contaning the error messages.

Example:
```json
{
  "errors": [
    {
      "msg": "Unauthorized"
    }
  ]
}
```
