import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    const token = localStorage.getItem('token');  // Check if user is logged in

    return (
        <div className="container text-center">
            <h1>Welcome to the User Management App</h1>
            <p>This application allows you to manage users, including registration, login, and administrative functions.</p>
            {!token && (  // Only show buttons if the user is not logged in
                <><p>Please register or login to continue.</p>
                <div>
                    <Link to="/register" className="btn btn-primary mx-2">Register</Link>
                    <Link to="/login" className="btn btn-secondary mx-2">Login</Link>
                </div></>
            )}
            
            
        </div>
    );
}

export default HomePage;
