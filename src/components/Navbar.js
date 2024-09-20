import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');  // Check if user is logged in
    const username = localStorage.getItem('username'); // Retrieve username from localStorage

    const handleLogout = () => {
        localStorage.clear();  // Clear user data on logout
        navigate('/');  // Redirect to login page after logout
    };

    return (
        <nav className="navbar mb-3 px-3" style={{ backgroundColor: '#e3f2fd' }}>
            <div className="d-flex w-100 align-items-center justify-content-between">
                <Link className="navbar-brand" to="/">User Management</Link> {/* Use Link for home */}
                <div className="d-flex align-items-center">
                    <Link className="nav-item nav-link me-4" to="/">Home</Link>  {/* Use Link for home */}
                    {token && (
                        <div className="d-flex align-items-center">
                            <span className="me-3">Hello, 
                                <Link to="/admin" style={{ textDecoration: 'none' }}> {/* Link to /admin */}
                                    {username}
                                </Link>
                            </span>
                            <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
