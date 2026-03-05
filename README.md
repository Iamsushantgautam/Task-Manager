# Simple Task Manager Application

This is a modern, lightweight full-stack task manager built with React for the frontend and Node.js/Express + MongoDB for the backend. It features a custom aesthetic UI styled with Vanilla CSS, JWT authentication, and full task CRUD features.

## Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (Local or Atlas)

## Setup Instructions

### 1. Database Setup
Ensure you have MongoDB running locally on `mongodb://127.0.0.1:27017` or update the `MONGO_URI` in `backend/.env` to point to your cloud database.

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal.
```bash
cd frontend
npm install
npm run dev
```
The application will run on `http://localhost:5173`.

## Features
- **User Authentication**: Secure registration and login with bcrypt and JWT.
- **Task Management**: Create, view, complete, and delete tasks.
- **Responsive UI**: Premium vanilla CSS design with glassmorphism effects.
