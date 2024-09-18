import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';  // Import the api instance

function RegistrationForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', { name, email, password });  // Use the api instance
            alert('Registration successful! Please log in.');
            navigate('/');  // Redirect to login page after successful registration
        } catch (error) {
            // Check if error.response exists (indicating a server-side error)
            if (error.response && error.response.status === 400) {
            // Handle specific error from backend
                alert(error.response.data || 'Registration failed. Please try again.');  // Show specific backend error message
            } else {
                // Handle other errors (e.g., network issues)
                alert('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div>
            <h2 className="mb-4" style={{textAlign:'center'}}>Register</h2>
            <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label>Name:</label>
                      <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group mb-3">
                      <label>Email:</label>
                      <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group mb-3">
                      <label>Password:</label>
                      <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary mb-3" style={{display: 'block', margin: 'auto'}}>Register</button>
                        <Link to="/login" style={{textDecoration: 'none'}}>
                            <button className="btn btn-secondary" style={{display: 'block', margin: 'auto', textDecoration: 'none'}}>Login</button>
                        </Link>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;
