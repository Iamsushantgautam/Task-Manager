import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthContext } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div className="spinner"></div>;

  return user ? children : <Navigate to="/login" />;
}

function Layout() {
  const location = useLocation();
  const authRoutes = ['/login', '/register'];
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <>
      {!isAuthPage && <Header />}
      <div className={isAuthPage ? '' : 'container'}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div className="auth-page"><Login /></div>} />
          <Route path="/register" element={<div className="auth-page"><Register /></div>} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
