## Student Management System - Front-End

This project serves as the front-end interface for a Student Management System built with React. It enables users to efficiently manage student data, including functionalities for adding, updating, retrieving, and removing student records. The application incorporates user authentication and implements role-based access control.

### Key Features
- User authentication (Login & Sign Up)
- Manage student records (Add, update, delete)
- Display student list
- Role-based access control (admin/user)
- State management using Redux
- Responsive design for various devices

### Project Structure
- `src/components/` - Contains React components for user interface and functionality
- `src/redux/` - Includes Redux store setup, actions, reducers, and constants
- `src/styles/` - CSS styles for the application
- `src/assets/` - Image and other asset files
- `public/` - Static files served by the application

### Getting Started
1. **Install dependencies:**
	```bash
	npm install
	```
2. **Run the development server:**
	```bash
	npm start
	```
3. Access the application at [http://localhost:3000](http://localhost:3000).

### Usage Instructions
- Register or log in to access the main dashboard.
- Add new student entries, modify existing records, or remove students as needed.
- Admin users have full access to all functionalities; regular users have restricted access.

### Technologies Utilized
- React
- Redux
- JavaScript
