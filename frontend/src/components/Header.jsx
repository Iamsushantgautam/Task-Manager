import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="navbar">
            <div className="navbar-inner container">
                <Link to="/" className="logo">
                    <img src={logo} alt="TaskManager Logo" style={{ width: '32px', height: '32px', borderRadius: '6px' }} />
                    TaskManager
                </Link>
                <div className="nav-links">
                    {user ? (
                        <>
                            <span className="nav-email">{user.email}</span>
                            <button onClick={onLogout} className="btn-nav-logout">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className="btn-nav-link">Register</Link>
                            <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
