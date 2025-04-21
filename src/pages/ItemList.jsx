import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await api.get('/items');
                setItems(res.data?.data || []);
            } catch (err) {
                setError('Gagal memuat data barang');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Daftar Barang</h2>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && items.length === 0 && (
                <p className="text-gray-500">Belum ada barang.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {items.map(item => (
                    <div key={item._id} className="p-4 border rounded shadow">
                        {item.image && (
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-48 object-cover mb-2"
                            />
                        )}
                        <h3 className="text-xl font-semibold">{item.name}</h3>
                        <p><strong>Kategori:</strong> {item.category?.name || '-'}</p>
                        <p><strong>Jumlah:</strong> {item.quantity}</p>
                        <p><strong>Lokasi:</strong> {item.location}</p>
                        <p><strong>Kondisi:</strong> {item.condition}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;
