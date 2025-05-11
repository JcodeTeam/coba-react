import React, { useState, useEffect } from 'react';
import api from '../services/api';

export const BarangMasukForm = () => {
    const [formData, setFormData] = useState({
        itemId: '',
        quantity: '',
        date: '',
        source: '',
    });
    const [message, setMessage] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await api.get('/items');
                setItems(res.data.data);
            } catch (error) {
                console.error('Gagal mengambil data barang:', error);
            }
        };
        fetchItems();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/transaksi/masuk', {
                itemId: formData.itemId,
                quantity: Number(formData.quantity),
                date: formData.date,
                source: formData.source
            });
            setMessage(res.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Terjadi kesalahan');
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Barang Masuk</h2>
            {message && <div className="mb-4 text-sm text-green-600">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <select
                    name="itemId"
                    value={formData.itemId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Pilih Barang</option>
                    {items.map((item) => (
                        <option key={item._id} value={item._id}>{item.name}</option>
                    ))}
                </select>
                <input
                    type="number"
                    name="quantity"
                    placeholder="Jumlah"
                    className="w-full p-2 border rounded"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="date"
                    className="w-full p-2 border rounded"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="source"
                    placeholder="Sumber Barang"
                    className="w-full p-2 border rounded"
                    value={formData.source}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
};

export const BarangKeluarForm = () => {
    const [formData, setFormData] = useState({
        itemId: '',
        quantity: '',
        date: '',
        purpose: '',
    });
    const [message, setMessage] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await api.get('/items');
                setItems(res.data.data);
            } catch (error) {
                console.error('Gagal mengambil data barang:', error);
            }
        };
        fetchItems();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('transaksi/keluar', {
                itemId: formData.itemId,
                quantity: Number(formData.quantity),
                date: formData.date,
                purpose: formData.purpose
            });
            setMessage(res.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Terjadi kesalahan');
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Barang Keluar</h2>
            {message && <div className="mb-4 text-sm text-green-600">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <select
                    name="itemId"
                    value={formData.itemId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Pilih Barang</option>
                    {items.map((item) => (
                        <option key={item._id} value={item._id}>{item.name}</option>
                    ))}
                </select>
                <input
                    type="number"
                    name="quantity"
                    placeholder="Jumlah"
                    className="w-full p-2 border rounded"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="date"
                    className="w-full p-2 border rounded"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="purpose"
                    placeholder="Tujuan Penggunaan"
                    className="w-full p-2 border rounded"
                    value={formData.purpose}
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
};
