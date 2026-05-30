import axios from 'axios';

// src/lib/axios.ts (di folder frontend)
const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1', // <-- Arahkan ke port 5000 milik NestJS
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;