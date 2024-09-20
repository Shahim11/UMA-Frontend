import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';  // Import the api instance
import { FaTrash, FaLockOpen , FaLock  } from 'react-icons/fa';  // Importing icons

function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const navigate = useNavigate();

    // Fetch all users when the component loads
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');  // Redirect to login page if not authenticated
            return;
        }
        
        api.get('/api/users/users', {
            headers: { Authorization: token }
        })
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/');  // Redirect to login page if unauthorized
            }
        });
    }, [navigate]);

    // Handle selecting users
    const handleSelect = (id) => {
        setSelectedIds((prev) => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    // Block selected users
    const handleBlock = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.post('/api/users/block', { ids: selectedIds }, {
                headers: { Authorization: token }
            });
    
            alert(response.data.message); // Show the server message
    
            if (response.data.currentUserBlocked) {
                localStorage.removeItem('token'); // Remove the token
                navigate('/'); // Redirect to the home page
            } else {
                // window.location.reload(); // Refresh the page
                fetchUsers();  // Refresh the user list after blocking
                setSelectedIds([]);  // Clear selected checkboxes
            }
        } catch (error) {
            alert('Error blocking users. Please try again.');
        }
    };
    
    // Unblock selected users
    const handleUnblock = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.post('/api/users/unblock', { ids: selectedIds }, {
                headers: { Authorization: token }
            });
            
            // alert('Users unblocked');
            alert(response.data.message);
            fetchUsers();  // Refresh the user list after unblocking
            setSelectedIds([]);  // Clear selected checkboxes
        } catch (error) {
            alert('Error unblocking users. Please try again.');
        } 
    };

    // Delete selected users
    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.post('/api/users/delete', { ids: selectedIds }, {
                headers: { Authorization: token }
            });

            alert(response.data.message); // Show the server message
    
            if (response.data.currentUserDeleted) {
                localStorage.removeItem('token'); // Remove the token
                navigate('/'); // Redirect to the home page
            } else {
                fetchUsers();  // Refresh the user list after deleting
                // window.location.reload(); // Refresh the page
            }
        } catch (error) {
            alert('Error deleting users. Please try again.');
        }
    };

    // Fetch the user list from the backend (Refactor to reuse after actions)
    const fetchUsers = () => {
        const token = localStorage.getItem('token');
        api.get('/api/users/users', {
            headers: { Authorization: token }
        })
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/');
            }
        });
    };
    

    return (
        <div className='px-4 mx-4'>
            <div className="d-flex justify-content-between mb-3">
                {/* Toolbar */}
                <div className="btn-toolbar" role="toolbar">
                    <div className="btn-group me-2" role="group">
                        <button onClick={handleBlock} className="btn btn-danger d-flex align-items-center">
                            <FaLock className="me-1" /> <span> Block</span>  {/* Icon with text */}
                        </button>
                    </div>
                    <div className="btn-group me-2" role="group">
                        <button onClick={handleUnblock} className="btn btn-secondary">
                            <FaLockOpen /> {/* Icon for Unblock */}
                        </button>
                    </div>
                    <div className="btn-group" role="group">
                        <button onClick={handleDelete} className="btn btn-danger">
                            <FaTrash /> {/* Icon for Delete */}
                        </button>
                    </div>
                </div>
            </div>

            <div className="table-responsive rounded-2">
                <table className="table table-hover table-light table-striped">
                    <thead class="table-primary">
                        <tr>
                            <th>
                                <input type="checkbox" onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedIds(users.map(user => user.id));  // Select all
                                    } else {
                                        setSelectedIds([]);  // Unselect all
                                    }
                                }} />
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Last Login Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <input type="checkbox" checked={selectedIds.includes(user.id)} onChange={() => handleSelect(user.id)} />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{new Date(user.last_login_time).toLocaleString()}</td>
                                <td>{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>    
        </div>
    );
}

export default AdminPanel;