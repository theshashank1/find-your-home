### API documentation with all the routes for `users.js`, `properties.js`, `chat.js`, `rentals.js` and `search.js`  including the necessary fields for user and property management.

---

# FIND YOUR HOME
#### API documentation for the application.

### **1. Users API**

#### **1.1 Register User**

- **Method:** `POST`
- **Endpoint:** `/api/users/register`
- **Description:** Register a new user.
- **Request Body:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "landlord",
  "phone": "123-456-7890",
  "whatsappNumber": "+1234567890",
  "profilePicture": "http://example.com/profile.jpg"
}
```

- **Response:**

**Success (201 Created):**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "landlord",
  "phone": "123-456-7890",
  "whatsappNumber": "+1234567890",
  "profilePicture": "http://example.com/profile.jpg"
}
```

**Error (400 Bad Request):**
```json
{
  "message": "Validation error"
}
```

---

#### **1.2 Login User**

- **Method:** `POST`
- **Endpoint:** `/api/users/login`
- **Description:** Log in a user.
- **Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

- **Response:**

**Success (200 OK):**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "landlord",
  "phone": "123-456-7890",
  "whatsappNumber": "+1234567890",
  "profilePicture": "http://example.com/profile.jpg",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjExMzg0MTg3LCJleHBpcmF0aW9uIjoibm9uZSJ9.BM8H6Tyt6dK30J6Uz9lcq65cLvn_c8xLeFznvv-lG9U"
}
```

**Error (401 Unauthorized):**
```json
{
  "message": "Invalid email or password"
}
```

---

#### **1.3 Get User**

- **Method:** `GET`
- **Endpoint:** `/api/users/:id`
- **Description:** Get user details by ID.
- **Response:**

**Success (200 OK):**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "landlord",
  "phone": "123-456-7890",
  "whatsappNumber": "+1234567890",
  "profilePicture": "http://example.com/profile.jpg"
}
```

**Error (404 Not Found):**
```json
{
  "message": "User not found"
}
```

---

#### **1.4 Update User**

- **Method:** `PUT`
- **Endpoint:** `/api/users/:id`
- **Description:** Update user details by ID.
- **Request Body:**

```json
{
  "phone": "987-654-3210",
  "whatsappNumber": "+0987654321",
  "profilePicture": "http://example.com/new-profile.jpg"
}
```

- **Response:**

**Success (200 OK):**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "role": "landlord",
  "phone": "987-654-3210",
  "whatsappNumber": "+0987654321",
  "profilePicture": "http://example.com/new-profile.jpg"
}
```

**Error (404 Not Found):**
```json
{
  "message": "User not found"
}
```

---

#### **1.5 Delete User**

- **Method:** `DELETE`
- **Endpoint:** `/api/users/:id`
- **Description:** Delete a user by ID.
- **Response:**

**Success (204 No Content):**
(No response body)

**Error (404 Not Found):**
```json
{
  "message": "User not found"
}
```

---

### **2. Properties API**

#### **2.1 Add Property**

- **Method:** `POST`
- **Endpoint:** `/api/properties`
- **Description:** Add a new property for rent.
- **Request Body:**

```json
{
  "ownerId": "1",
  "title": "Beautiful Apartment",
  "description": "A spacious apartment in the city center.",
  "price": 1200,
  "location": {
    "address": "123 Main St",
    "city": "Cityville",
    "country": "Countryland",
    "postalCode": "12345"
  },
  "type": "apartment",
  "bedrooms": 3,
  "bathrooms": 2,
  "amenities": ["Pool", "Parking"],
  "images": [
    "http://example.com/image1.jpg",
    "http://example.com/image2.jpg"
  ]
}
```

- **Response:**

**Success (201 Created):**
```json
{
  "id": 1,
  "ownerId": "1",
  "title": "Beautiful Apartment",
  "description": "A spacious apartment in the city center.",
  "price": 1200,
  "location": {
    "address": "123 Main St",
    "city": "Cityville",
    "country": "Countryland",
    "postalCode": "12345"
  },
  "type": "apartment",
  "bedrooms": 3,
  "bathrooms": 2,
  "amenities": ["Pool", "Parking"],
  "images": [
    "http://example.com/image1.jpg",
    "http://example.com/image2.jpg"
  ]
}
```

**Error (400 Bad Request):**
```json
{
  "message": "Validation error"
}
```

---

#### **2.2 Get Properties**

- **Method:** `GET`
- **Endpoint:** `/api/properties`
- **Description:** Get a list of properties.
- **Response:**

**Success (200 OK):**
```json
[
  {
    "id": 1,
    "ownerId": "1",
    "title": "Beautiful Apartment",
    "description": "A spacious apartment in the city center.",
    "price": 1200,
    "location": {
      "address": "123 Main St",
      "city": "Cityville",
      "country": "Countryland",
      "postalCode": "12345"
    },
    "type": "apartment",
    "bedrooms": 3,
    "bathrooms": 2,
    "amenities": ["Pool", "Parking"],
    "images": [
      "http://example.com/image1.jpg",
      "http://example.com/image2.jpg"
    ]
  },
  ...
]
```

**Error (500 Internal Server Error):**
```json
{
  "message": "Server error"
}
```

---

#### **2.3 Get Property**

- **Method:** `GET`
- **Endpoint:** `/api/properties/:id`
- **Description:** Get details of a specific property by ID.
- **Response:**

**Success (200 OK):**
```json
{
  "id": 1,
  "ownerId": "1",
  "title": "Beautiful Apartment",
  "description": "A spacious apartment in the city center.",
  "price": 1200,
  "location": {
    "address": "123 Main St",
    "city": "Cityville",
    "country": "Countryland",
    "postalCode": "12345"
  },
  "type": "apartment",
  "bedrooms": 3,
  "bathrooms": 2,
  "amenities": ["Pool", "Parking"],
  "images": [
    "http://example.com/image1.jpg",
    "http://example.com/image2.jpg"
  ]
}
```

**Error (404 Not Found):**
```json
{
  "message": "Property not found"
}
```

**Error (500 Internal Server Error):**
```json
{
  "message": "Server error"
}
```

---

#### **2.4 Update Property**

- **Method:** `PUT`
- **Endpoint:** `/api/properties/:id`
- **Description:** Update property details by ID.
- **Request Body:**

```json
{
  "price": 1300,
  "description": "Updated description of the property.",
  "location": {
    "address": "456 Elm St",
    "city": "New Cityville",
    "country": "New Countryland",
    "postalCode": "67890"
  }
}
```

- **Response:**

**Success (200 OK):**
```json
{
  "id": 1,
  "ownerId": "1",
  "title": "Beautiful Apartment",
  "description": "Updated description of the property.",
  "price": 130

0,
  "location": {
    "address": "456 Elm St",
    "city": "New Cityville",
    "country": "New Countryland",
    "postalCode": "67890"
  },
  "type": "apartment",
  "bedrooms": 3,
  "bathrooms": 2,
  "amenities": ["Pool", "Parking"],
  "images": [
    "http://example.com/image1.jpg",
    "http://example.com/image2.jpg"
  ]
}
```

**Error (404 Not Found):**
```json
{
  "message": "Property not found"
}
```

**Error (400 Bad Request):**
```json
{
  "message": "Validation error"
}
```

---

#### **2.5 Delete Property**

- **Method:** `DELETE`
- **Endpoint:** `/api/properties/:id`
- **Description:** Delete a property by ID.
- **Response:**

**Success (204 No Content):**
(No response body)

**Error (404 Not Found):**
```json
{
  "message": "Property not found"
}
```

**Error (500 Internal Server Error):**
```json
{
  "message": "Server error"
}
```

---

### **3. Chat API**

WhatsApp chat redirection route:



#### **1. Chat via WhatsApp**

- **Method:** `GET`
- **Endpoint:** `/api/chat/whatsapp`
- **Description:** Redirect users to WhatsApp chat for support.
- **Request Query Parameters:**

| Parameter      | Type   | Description                                  | Example                          |
|----------------|--------|----------------------------------------------|----------------------------------|
| `userPhone`    | string | The user's phone number to chat with          | `+1234567890`                    |
| `message`      | string | Predefined message to be sent in the chat     | `Hello, I need help with...`     |

- **Response:**

**Success (302 Found):**
Redirects to WhatsApp chat. Example URL:
```json
{
  "redirectUrl": "https://wa.me/+1234567890?text=Hello%2C%20I%20need%20help%20with%20the%20house%20rental%20application."
}
```

**Error (500 Internal Server Error):**
```json
{
  "message": "Unable to redirect to WhatsApp chat"
}
```

---

This update adds query parameters for the user's phone number and a predefined message, making it easier for users to start a chat directly from your application.

---


Here’s the additional documentation covering the `rentals.js` and `search.js` APIs for your house rental application:

---

### **4. Rentals API**

#### **4.1 Rent Property**

- **Method:** `POST`
- **Endpoint:** `/api/rentals`
- **Description:** Rent a property by a customer.
- **Request Body:**

```json
{
  "customerId": "2",
  "propertyId": "1",
  "startDate": "2024-09-01",
  "endDate": "2025-08-31",
  "rentAmount": 1200
}
```

- **Response:**

**Success (201 Created):**
```json
{
  "rentalId": "rental123",
  "customerId": "2",
  "propertyId": "1",
  "startDate": "2024-09-01",
  "endDate": "2025-08-31",
  "rentAmount": 1200,
  "status": "active"
}
```

**Error (400 Bad Request):**
```json
{
  "message": "Validation error"
}
```

---

#### **4.2 Get Rental**

- **Method:** `GET`
- **Endpoint:** `/api/rentals/:rentalId`
- **Description:** Get details of a specific rental by rental ID.
- **Response:**

**Success (200 OK):**
```json
{
  "rentalId": "rental123",
  "customerId": "2",
  "propertyId": "1",
  "startDate": "2024-09-01",
  "endDate": "2025-08-31",
  "rentAmount": 1200,
  "status": "active"
}
```

**Error (404 Not Found):**
```json
{
  "message": "Rental not found"
}
```

---

#### **4.3 Get Rentals for User**

- **Method:** `GET`
- **Endpoint:** `/api/rentals/user/:userId`
- **Description:** Get all rentals associated with a specific user (either customer or landlord).
- **Response:**

**Success (200 OK):**
```json
[
  {
    "rentalId": "rental123",
    "customerId": "2",
    "propertyId": "1",
    "startDate": "2024-09-01",
    "endDate": "2025-08-31",
    "rentAmount": 1200,
    "status": "active"
  },
  ...
]
```

**Error (500 Internal Server Error):**
```json
{
  "message": "Server error"
}
```

---

#### **4.4 End Rental**

- **Method:** `PUT`
- **Endpoint:** `/api/rentals/:rentalId/end`
- **Description:** End an active rental.
- **Response:**

**Success (200 OK):**
```json
{
  "rentalId": "rental123",
  "status": "ended"
}
```

**Error (404 Not Found):**
```json
{
  "message": "Rental not found"
}
```

---

### **5. Search API**

#### **5.1 Search Properties**

- **Method:** `GET`
- **Endpoint:** `/api/search`
- **Description:** Search properties based on various filters.
- **Query Parameters:**

| Parameter   | Type   | Description                           | Example                   |
|-------------|--------|---------------------------------------|---------------------------|
| `city`      | string | Filter by city                        | `Cityville`               |
| `country`   | string | Filter by country                     | `Countryland`             |
| `type`      | string | Filter by property type               | `apartment`, `house`      |
| `minPrice`  | number | Filter by minimum price               | `1000`                    |
| `maxPrice`  | number | Filter by maximum price               | `1500`                    |
| `bedrooms`  | number | Filter by number of bedrooms          | `3`                       |
| `bathrooms` | number | Filter by number of bathrooms         | `2`                       |
| `amenities` | string | Filter by amenities (comma-separated) | `Pool,Parking`            |

- **Response:**

**Success (200 OK):**
```json
[
  {
    "id": 1,
    "ownerId": "1",
    "title": "Beautiful Apartment",
    "description": "A spacious apartment in the city center.",
    "price": 1200,
    "location": {
      "address": "123 Main St",
      "city": "Cityville",
      "country": "Countryland",
      "postalCode": "12345"
    },
    "type": "apartment",
    "bedrooms": 3,
    "bathrooms": 2,
    "amenities": ["Pool", "Parking"],
    "images": [
      "http://example.com/image1.jpg",
      "http://example.com/image2.jpg"
    ]
  },
  ...
]
```

**Error (500 Internal Server Error):**
```json
{
  "message": "Server error"
}
```

---

This additional documentation includes routes for managing rentals and searching properties, which are essential features for your house rental application. Each route is described with expected input and output formats, ensuring a clear understanding for development.
This documentation includes all the necessary endpoints for user management, property management, and chat functionalities, ensuring a seamless development process for your house rental application.