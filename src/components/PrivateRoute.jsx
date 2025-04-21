// src/components/PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...rest }) => {
    const isAuthenticated = localStorage.getItem('auth_token'); // Cek token di localStorage

    return (
        <Route
            {...rest}
            element={isAuthenticated ? element : <Navigate to="/login" />} // Redirect ke login jika tidak terautentikasi
        />
    );
};

export default PrivateRoute;
