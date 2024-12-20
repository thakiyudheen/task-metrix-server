# task-metrix-server

# Node.js Backend for Full-Stack Application

This backend is built using **Node.js**, **Express**, and **MongoDB** (with Mongoose). It supports features like JWT-based authentication, Google OAuth, and task management with advanced pagination and filtering.

---

## Features

### Authentication
- **JWT Authentication**: Secure access to APIs using JSON Web Tokens.
- **Google OAuth**: Enable users to log in with their Google accounts.
- **Email-Password Login**: Secure login using bcrypt for password hashing.

### Task Management
- **CRUD Operations**: Create, read, update, and delete tasks.
- **Pagination**: Efficient data handling with `page` and `limit` query parameters.
- **Filtering**: Support for filtering tasks by completion status (e.g., completed, in-progress).

### Database
- MongoDB with Mongoose for defining schemas and querying data.

### Middleware
- Custom error handling for consistent responses.
- JWT authentication middleware for protected routes.

---



## Technologies Used

- **Node.js**: Runtime environment.
- **Express.js**: Backend framework.
- **MongoDB**: Database.
- **Mongoose**: MongoDB object modeling.
- **jsonwebtoken**: For JWT authentication.
- **bcryptjs**: For password hashing.


---

## Folder Structure

```
backend/
├── src/
│   ├── controllers/
│   │  
│   ├── models/
│   │   
│   ├── routes/
│   │  
│   ├── middleware/
│   │   
│   ├── utils/
│   ├
│   ├── repositories/
│   │   
│   └── index.ts
├── .env
├── package.json
└── README.md
```

---

## Example `.env` File

## License


