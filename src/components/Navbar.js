import React from 'react';
import { useNavigate } from 'react-router-dom';

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
                <a className="navbar-brand" href="/">User Management</a>
                <div className="d-flex align-items-center">
                    <a className="nav-item nav-link me-4" href="/">Home</a>
                    {token && (
                        <div className="d-flex align-items-center">
                            <span className="me-3">Hello, 
                                <a href="/admin" style={{ textDecoration: 'none' }}> {username}</a>!
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
