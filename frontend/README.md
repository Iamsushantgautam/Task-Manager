# Task Manager - Frontend

The frontend of the Task Manager application, built with React and Vite. It provides a fast, responsive, and intuitive user interface for managing tasks.

## 🛠️ Technology Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM (v7)
- **HTTP Client**: Axios
- **Styling**: TailwindCSS & Custom CSS
- **Authentication**: JWT parsing via `jwt-decode`

## 📁 Key Features
- **Authentication Pages**: Login and Registration screens with validation.
- **Dashboard**: A protected view where users can see their personal tasks.
- **Task Interaction**: Users can easily add, update, mark as complete, or delete tasks.
- **Context API State**: Global state management for authentication properties.

## 🚀 Getting Started

### 1. Installation
Ensure you are in the `frontend` directory and run:
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file in the `frontend` root (if needed by your API base URL configuration) with your backend API URL. For example:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Running the App
Start the development server:
```bash
npm run dev
```
The application will launch on `http://localhost:5173`.

### Available Scripts
- `npm run dev` - Starts the Vite development server.
- `npm run build` - Builds the application for production.
- `npm run lint` - Runs ESLint to check for code quality issues.
- `npm run preview` - Previews the production build locally.
