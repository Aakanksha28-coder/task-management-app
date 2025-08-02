# Task Management App

A full-stack task management application built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to register, login, and manage their tasks with features like creating, editing, marking as complete, and deleting tasks.

## Features

- **User Authentication**
  - Register with email and password
  - Login with JWT token authentication
  - Protected routes for authenticated users

- **Task Management**
  - Create new tasks with title, description, and optional due date
  - Edit existing tasks
  - Mark tasks as completed or pending
  - Delete tasks
  - Filter tasks by status (All, Pending, Completed)
  - Sort tasks by due date

- **Responsive Design**
  - Mobile-friendly interface
  - Clean and intuitive UI

## Screenshots

*Add screenshots of your application here*

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React
- React Router for navigation
- Axios for API requests
- Bootstrap for styling
- React Toastify for notifications

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd task-manager-app/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd task-manager-app/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Approach and Challenges

The development of this Task Management App focused on creating a clean, intuitive interface while maintaining a robust backend architecture. The application follows RESTful API design principles and implements proper authentication and authorization mechanisms.

Some challenges faced during development included:

- Implementing proper JWT authentication and protecting routes
- Managing state across components for task editing and filtering
- Creating a responsive design that works well on both desktop and mobile devices
- Handling error states and providing meaningful feedback to users

## Future Improvements

- Add task categories/tags
- Implement drag-and-drop interface for task organization
- Add user profile management
- Implement task sharing between users
- Add email notifications for upcoming due dates

## License

MIT