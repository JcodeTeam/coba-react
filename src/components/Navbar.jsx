import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('auth_token');  // Hapus token
        setIsAuthenticated(false);              // Update status login
        navigate('/login');                     // Redirect ke halaman login
    };

    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between">
            <div className="text-xl font-bold">SaranaKu</div>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
