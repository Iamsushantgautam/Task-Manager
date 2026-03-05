# Task Manager - Backend

The API layer of the Task Manager application, providing secure and robust endpoints to manage users and tasks.

## 🛠️ Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: JWT (JSON Web Tokens) and BcryptJS for password hashing
- **Environment Management**: dotenv
- **Middleware**: CORS support

## 🗄️ Architecture Overview
The backend follows an MVC-like pattern:
- **Models**: Mongoose schemas defining `User` and `Task` data structures.
- **Controllers**: Business logic for handling incoming requests (e.g., authentication, task CRUD).
- **Routes**: Express route definitions that map endpoints to controllers.
- **Middleware**: Custom hooks (e.g., `authMiddleware`) for protecting routes via JWT verification.

## 🚀 Getting Started

### 1. Installation
Navigate to the `backend` directory and run:
```bash
npm install
```

### 2. Configuration
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task-manager
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Running the Server
Start the server in development mode (using nodemon):
```bash
npm run dev
```
Or start it in production mode:
```bash
npm start
```
The server will run on `http://localhost:5000`.

## 🌐 API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user & get JWT

### Tasks (Protected Routes)
- `GET /api/tasks` - Retrieve all tasks for the logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a specific task
- `DELETE /api/tasks/:id` - Delete a specific task
