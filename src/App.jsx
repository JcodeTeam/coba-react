import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddItemForm from './pages/AddItemForm';
import CategoriesPage from './pages/CategoriesPage';
import ItemList from './pages/ItemList';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null untuk menunggu pengecekan

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token); // set ke true kalau ada token, false kalau tidak ada
  }, []);

  // Cek status autentikasi, kalau null berarti masih dalam proses pengecekan
  if (isAuthenticated === null) return <div>Loading...</div>;

  return (
    <Router>
      {/* Navbar hanya muncul kalau sudah login */}
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}

      <Routes>
        {/* Halaman login */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/items" /> // Redirect jika sudah login
            ) : (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        {/* Halaman item */}
        <Route
          path="/items"
          element={
            isAuthenticated ? (
              <ItemList />
            ) : (
              <Navigate to="/login" state={{ from: '/items' }} />
            )
          }
        />
        {/* Halaman tambah barang */}
        <Route
          path="/tambah-barang"
          element={
            isAuthenticated ? (
              <AddItemForm />
            ) : (
              <Navigate to="/login" state={{ from: '/tambah-barang' }} />
            )
          }
        />
        {/* Halaman kategori */}
        <Route
          path="/categories"
          element={
            isAuthenticated ? (
              <CategoriesPage />
            ) : (
              <Navigate to="/login" state={{ from: '/categories' }} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
