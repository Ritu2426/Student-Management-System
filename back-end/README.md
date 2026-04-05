# Student Management System Backend

This project is a Node.js backend for a Student Management System. It provides RESTful APIs for authentication and student management, using Express and MySQL.

## Features
- User authentication (login, register)
- CRUD operations for students
- Input validation and error handling
- Modular structure for controllers, models, routes, and middlewares

## Folder Structure
```
index.js                # Entry point
package.json            # Project metadata and dependencies
config/
  database.js           # MySQL connection setup
controllers/
  authController.js     # Authentication logic
  studentController.js  # Student CRUD logic
middlewares/
  errorMiddleware.js    # Error handling
  validateMiddleware.js # Input validation
models/
  authUser.js           # User schema/model
  students.js           # Student schema/model
routes/
  routes.js             # API route definitions
```

## Setup Instructions
1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd back-end
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure MySQL**
   - Set your database credentials in a `.env` file:
     ```
     DB_HOST=localhost
     DB_USER=your_user
     DB_PASSWORD=your_password
     DB_DATABASE=your_database
     ```
4. **Run the server**
   ```bash
   node index.js
   ```

## API Endpoints
- `/api/auth/register` - Register a new user
- `/api/auth/login` - Login user
- `/api/students` - CRUD operations for students

## Minor Details
- Uses Express for routing and middleware
- MySQL for data storage (via mysql2)
- Error and validation handled via custom middlewares
- Modular code for easy maintenance
- Environment variables can be used for sensitive configs

## Requirements
- Node.js >= 14
- MySQL instance (e.g. MySQL Workbench)
