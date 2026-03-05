# Simple Task Manager Application

A modern, full-stack task management application designed to help users organize their daily activities effectively. The project is split into a React-based frontend and a Node.js/Express backend using MongoDB.

## 🚀 Features
- **User Authentication**: Secure registration and login flows using JWT (JSON Web Tokens) and bcrypt.
- **Task Management**: Full CRUD operations for tasks (Create, Read, Update, Delete).
- **Responsive Design**: Custom UI with elegant styles, ensuring a seamless experience across desktop and mobile devices.
- **Protected Routes**: Frontend routing ensures that only authenticated users can access their dashboard and tasks.

## 🏗️ Project Structure
The repository is structured as a monorepo containing both the frontend and backend:
- [`/frontend`](./frontend): The React user interface built with Vite.
- [`/backend`](./backend): The Express Node.js application and API using MongoDB.

## 🛠️ Technology Stack
- **Frontend**: React 19, Vite, React Router DOM, Axios, TailwindCSS (configured for styling).
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, BcryptJS.

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB instance (Local or Atlas)

### Setup Instructions

#### 1. Database Setup
Ensure you have MongoDB running locally on `mongodb://127.0.0.1:27017` or configure your cloud database connection string. Create a `.env` file in the `backend` directory based on its configuration needs (e.g., `MONGO_URI` and `JWT_SECRET`).

#### 2. Backend Setup
Navigate to the backend directory, install dependencies, and start the development server:
```bash
cd backend
npm install
npm run dev
```
The backend server typically runs on `http://localhost:5000`.

#### 3. Frontend Setup
Open a new terminal window, navigate to the frontend directory, install dependencies, and start the Vite development server:
```bash
cd frontend
npm install
npm run dev
```
The application will be accessible at `http://localhost:5173`.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📜 License
This project is open-source and available under the MIT License.
