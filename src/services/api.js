import axios from 'axios';

// Base URL without `/api` path
const api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API_URL,  // Set this to just http://localhost:5000
});

// You can append '/api' globally like this, so you don’t need to put it in every request
api.interceptors.request.use(config => {
    config.url = `/api${config.url}`;
    return config;
});

export default api;
