
### API Documentation

#### 1. **User Management**

##### **1.1. Signup User**
- **URL**: `/api/users/signup`
- **Method**: `POST`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string",  // "landlord" or "customer"
    "phone": "string",
    "whatsappNumber": "string",
    "profilePicture": "string" // optional
  }
  ```
- **Responses**:
  - `201 Created`: User successfully created.
    ```json
    {
      "message": "User created successfully",
      "Data": {
        "_id": "string",
        "username": "string",
        "email": "string",
        ...
      }
    }
    ```
  - `400 Bad Request`: User already exists.
  - `500 Internal Server Error`: Server error.

##### **1.2. Login User**
- **URL**: `/api/users/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Responses**:
  - `200 OK`: User successfully logged in.
    ```json
    {
      "message": "Logged in successfully",
      "token": "string"
    }
    ```
  - `400 Bad Request`: Invalid credentials.
  - `500 Internal Server Error`: Server error.

##### **1.3. Delete User**
- **URL**: `/api/users/:id`
- **Method**: `DELETE`
- **Description**: Deletes a user by username.
- **URL Parameters**:
  - `id`: The username of the user to delete.
- **Responses**:
  - `200 OK`: User successfully deleted.
  - `400 Bad Request`: User not found.
  - `500 Internal Server Error`: Server error.

#### 2. **Property Management**

##### **2.1. Add Property**
- **URL**: `/api/properties/`
- **Method**: `POST`
- **Description**: Adds a new property to the listing.
- **Request Headers**:
  - `Cookie`: `user=<JWT Token>`
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "price": "number",
    "location": {
      "address": "string",
      "city": "string",
      "country": "string",
      "postalCode": "string"
    },
    "type": "string", // "apartment", "house", or "studio"
    "bedrooms": "number",
    "bathrooms": "number",
    "amenities": ["string"]
  }
  ```
- **Responses**:
  - `201 Created`: Property successfully added.
    ```json
    {
      "_id": "string",
      "ownerId": "string",
      "title": "string",
      ...
    }
    ```
  - `400 Bad Request`: Validation error or missing fields.
  - `401 Unauthorized`: No token provided or invalid token.
  - `500 Internal Server Error`: Server error.

##### **2.2. Get All Properties**
- **URL**: `/api/properties/`
- **Method**: `GET`
- **Description**: Retrieves a list of all properties.
- **Responses**:
  - `200 OK`: Returns a list of properties.
    ```json
    [
      {
        "_id": "string",
        "title": "string",
        ...
      }
    ]
    ```
  - `500 Internal Server Error`: Server error.

##### **2.3. Get Property by ID**
- **URL**: `/api/properties/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific property by its ID.
- **URL Parameters**:
  - `id`: The ID of the property.
- **Responses**:
  - `200 OK`: Property found.
    ```json
    {
      "_id": "string",
      "title": "string",
      ...
    }
    ```
  - `400 Bad Request`: Invalid property ID.
  - `404 Not Found`: Property not found.
  - `500 Internal Server Error`: Server error.

##### **2.4. Update Property**
- **URL**: `/api/properties/:id`
- **Method**: `PUT`
- **Description**: Updates property details.
- **URL Parameters**:
  - `id`: The ID of the property to update.
- **Request Body**:
  ```json
  {
    "price": "number", // optional
    "description": "string" // optional
  }
  ```
- **Responses**:
  - `200 OK`: Property successfully updated.
    ```json
    {
      "_id": "string",
      "title": "string",
      ...
    }
    ```
  - `400 Bad Request`: Invalid input or property ID.
  - `404 Not Found`: Property not found.
  - `500 Internal Server Error`: Server error.

##### **2.5. Delete Property**
- **URL**: `/api/properties/:id`
- **Method**: `DELETE`
- **Description**: Deletes a property by its ID.
- **URL Parameters**:
  - `id`: The ID of the property.
- **Responses**:
  - `204 No Content`: Property successfully deleted.
  - `400 Bad Request`: Invalid property ID.
  - `404 Not Found`: Property not found.
  - `500 Internal Server Error`: Server error.

#### 3. **Property Search**

##### **3.1. Search Properties**
- **URL**: `/api/search/search`
- **Method**: `GET`
- **Description**: Searches for properties based on natural language queries.
- **Query Parameters**:
  - `q`: The search query (e.g., "house in New York").
- **Responses**:
  - `200 OK`: Returns a list of properties that match the search criteria.
    ```json
    [
      {
        "_id": "string",
        "title": "string",
        ...
      }
    ]
    ```
  - `400 Bad Request`: Query parameter is required.
  - `404 Not Found`: No properties found.
  - `500 Internal Server Error`: Server error.

#### 4. **Chat Management**

##### **4.1. Chat with Property Owner**
- **URL**: `/api/chat/:propertyId`
- **Method**: `GET`
- **Description**: Generates a WhatsApp chat link to communicate with the property owner.
- **URL Parameters**:
  - `propertyId`: The ID of the property.
- **Responses**:
  - `200 OK`: Returns a WhatsApp link.
    ```json
    {
      "chat": "https://wa.me/<whatsappNumber>?text=<encodedMessage>"
    }
    ```
  - `400 Bad Request`: Invalid property ID.
  - `404 Not Found`: Property or owner not found.
  - `500 Internal Server Error`: Server error.

#### 5. **Rental Management**

- **URL**: `/api/rentals/...`
- **Method**: `...`
- **Description**: Handles rental agreements and management.
- *(Further details needed for complete documentation)*

---

### Notes
- All responses are in JSON format.
- For the endpoints that require authentication, the user must be logged in, and the JWT token must be provided in the request cookie (`user`).
- HTTP status codes are used to indicate the result of the API requests.

This API documentation provides a comprehensive overview of the available endpoints for the property rental application, including their purposes, expected inputs, and outputs.