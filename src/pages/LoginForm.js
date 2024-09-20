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
            // Check if error.response exists (indicating a server-side error)
            if (error.response && error.response.data.message) {
            // Show specific error message from the backend (e.g., "User is blocked", "Invalid password", etc.)
            alert(error.response.data.message);
            } else {
            // Handle other errors (e.g., network issues)
                alert('Login failed. Please check your credentials and try again.');
            }
        }
    };

    return (
        <div className='container text-center mt-5 pt-5'>
            <div className='row justify-content-md-center'>
                <div className='col-md-auto border rounded-4 p-5 m-3 bg-dark-subtle'>
                    <h2 className="mb-5" style={{textAlign:'center'}}>Login</h2>
                    <div className="d-flex justify-content-center">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3 text-start">
                                <label>Email</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group mb-4 text-start">
                                <label>Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary" style={{display: 'block', margin: 'auto'}}>Login</button>
                                <p className='my-1'>or</p>
                                <Link to="/register" className="btn btn-secondary mx-2">Register</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;