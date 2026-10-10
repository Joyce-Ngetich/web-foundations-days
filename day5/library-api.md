# Library REST API Design

A RESTful API specification for managing a library's `/books` resource.

## Endpoints

### 1. List All Books

- **Method**: `GET`
- **Path**: `/books`
- **Description**: Retrieves a complete list of all books in the library catalogue.
- **Success Status Code**: `200 OK`

### 2. Get Single Book Details

- **Method**: `GET`
- **Path**: `/books/:id`
- **Description**: Retrieves detailed information for a specific book by its ID.
- **Success Status Code**: `200 OK`

### 3. Create a New Book

- **Method**: `POST`
- **Path**: `/books`
- **Description**: Adds a new book entry to the catalogue.
- **Request Body Example**:
  ```json
  {
    "title": "The River Between",
    "author": "Ngũgĩ wa Thiong'o",
    "publishedYear": 1965,
    "genre": "Fiction"
  }
  ```
