// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api'; // import API service untuk request ke backend

const LoginPage = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/items';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await api.post('/auth/login', formData);

            if (response.data.success) {
                setIsAuthenticated(true);
                localStorage.setItem('auth_token', response.data.token);
                setMessage('✅ Login berhasil!');
                navigate(from);
            } else {
                setMessage('❌ Login gagal, periksa email dan password!');
            }
        } catch (err) {
            setMessage(`❌ Gagal login: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            {message && <div className="mb-4 text-sm text-center">{message}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={formData.email}
                    className="input"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={formData.password}
                    className="input"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary mt-4 w-full"
                >
                    {loading ? 'Menyimpan...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
