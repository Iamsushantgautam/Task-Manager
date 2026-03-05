import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="navbar">
            <Link to="/" className="logo">
                <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                TaskManager
            </Link>
            <div className="nav-links">
                {user ? (
                    <>
                        <span style={{ color: 'var(--text-secondary)' }}>{user.email}</span>
                        <button onClick={onLogout} className="btn-danger">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-primary">Login</Link>
                        <Link to="/register" style={{ color: 'var(--text-primary)' }}>Register</Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
