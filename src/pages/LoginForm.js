import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';  // Import the api instance

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/auth/login', { email, password });  // Use the api instance
            localStorage.setItem('token', response.data.token);  // Save token in localStorage
            localStorage.setItem('username', response.data.username);  // Save username in localStorage
            navigate('/admin');  // Redirect to admin page after successful login
        } catch (error) {
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <h2 className="mb-4" style={{textAlign:'center'}}>Login</h2>
            <div className="d-flex justify-content-center"> 
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary mb-3" style={{display: 'block', margin: 'auto'}}>Login</button>
                    <Link to="/register" style={{textDecoration: 'none'}}>
                        <button type="submit" className="btn btn-secondary" style={{display: 'block', margin: 'auto', textDecoration: 'none'}}>Register</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
