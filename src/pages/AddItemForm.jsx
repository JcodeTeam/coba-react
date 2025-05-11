import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AddItemForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        mainCategory: '',
        quantity: 0,
        location: '',
        condition: '',
        image: null
    });

    const [categories, setCategories] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, roomRes] = await Promise.all([
                    api.get('/categories'),
                    api.get('/rooms')
                ]);
                setCategories(catRes.data.data);
                setRooms(roomRes.data.data);
            } catch (err) {
                console.error('Gagal mengambil kategori/ruangan:', err);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files.length > 0) {
            const file = files[0];
            setFormData(prev => ({ ...prev, image: file }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                form.append(key, value);
            });

            await api.post('/items', form, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage('✅ Barang berhasil ditambahkan!');
            setFormData({
                name: '',
                category: '',
                mainCategory: '',
                quantity: 0,
                location: '',
                condition: '',
                image: null
            });
            setPreview(null);
        } catch (err) {
            setMessage(`❌ Gagal menambahkan: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Tambah Barang</h2>
            {message && <div className="mb-4 text-sm text-center">{message}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input name="name" type="text" placeholder="Nama Barang" onChange={handleChange} value={formData.name} className="input" required />

                <select name="mainCategory" onChange={handleChange} value={formData.mainCategory} className="input" required>
                    <option value="">Pilih Main Kategori</option>
                    <option value="asset">Asset</option>
                    <option value="non asset">Non Asset</option>
                </select>

                <select name="category" onChange={handleChange} value={formData.category} className="input" required>
                    <option value="">Pilih Kategori</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>

                <input name="quantity" type="number" placeholder="Jumlah" onChange={handleChange} value={formData.quantity} className="input" required />

                <select name="location" onChange={handleChange} value={formData.location} className="input" required>
                    <option value="">Pilih Ruangan</option>
                    {rooms.map(room => (
                        <option key={room._id} value={room._id}>{room.name}</option>
                    ))}
                </select>

                <select name="condition" onChange={handleChange} value={formData.condition} className="input" required>
                    <option value="">Pilih Kondisi</option>
                    <option value="Baik">Baik</option>
                    <option value="Rusak Ringan">Rusak Ringan</option>
                    <option value="Rusak Berat">Rusak Berat</option>
                </select>

                <input type="file" name="image" accept="image/*" onChange={handleChange} className="input" />
                {preview && <img src={preview} alt="Preview" className="w-32 mt-2" />}

                <button type="submit" disabled={loading} className="btn btn-primary mt-4 w-full">
                    {loading ? 'Menyimpan...' : 'Simpan Barang'}
                </button>
            </form>
        </div>
    );
};

export default AddItemForm;
