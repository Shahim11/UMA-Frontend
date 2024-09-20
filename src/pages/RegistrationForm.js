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
            const response = await api.post('/api/auth/register', { name, email, password });  // Use the api instance
            // alert('Registration Successful! Please log in.');
            alert(response.data.message); // Show the success message from the backend
            navigate('/');  // Redirect to login page after successful registration
        } catch (error) {
            // Check if error.response exists (indicating a server-side error)
            if (error.response && error.response.status === 400) {
            // Handle specific error from backend
                alert(error.response.data.message || 'Registration failed. Please try again.');  // Show specific backend error message
            } 
            else {
                // Handle other errors (e.g., network issues)
                alert('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className='container text-center mt-5 pt-5'>
            <div className='row justify-content-md-center'>
                <div className='col-md-auto border rounded-4 p-5 m-3 bg-dark-subtle'>
                    <h2 className="mb-5" style={{textAlign:'center'}}>Register</h2>
                    <div className="d-flex justify-content-center">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3 text-start">
                                <label>Name</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="form-group mb-3 text-start">
                                <label>Email</label>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="form-group mb-4 text-start">
                                <label>Password</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary" style={{display: 'block', margin: 'auto'}}>Register</button>
                                <p className='my-1'>or</p>
                                <Link to="/login" className="btn btn-secondary mx-2">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;
