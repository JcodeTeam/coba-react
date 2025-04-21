import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Import API service

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]); // State untuk menyimpan kategori
    const [loading, setLoading] = useState(true); // State untuk loading
    const [message, setMessage] = useState(''); // State untuk pesan error jika ada

    // Ambil data kategori dari backend saat komponen pertama kali dimuat
    useEffect(() => {
        api.get('/categories')
            .then(res => {
                setCategories(res.data.data); // Set data kategori
                setLoading(false); // Set loading false setelah data diterima
            })
            .catch(err => {
                console.error('Error fetching categories:', err); // Menangani error
                setMessage('Gagal mengambil kategori');
                setLoading(false); // Set loading false meskipun ada error
            });
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Daftar Kategori</h2>

            {/* Tampilkan pesan error jika ada */}
            {message && <div className="text-red-500 mb-4">{message}</div>}

            {/* Tampilkan loading indicator jika data sedang dimuat */}
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div>
                    {/* Tampilkan daftar kategori */}
                    <ul className="list-disc pl-5">
                        {categories.length > 0 ? (
                            categories.map(cat => (
                                <li key={cat._id} className="text-lg">{cat.name}</li>
                            ))
                        ) : (
                            <li>Tidak ada kategori yang tersedia</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;
