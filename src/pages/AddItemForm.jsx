import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AddItemForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        quantity: 0,
        location: '',
        condition: '',
        image: ''
    });

    const [categories, setCategories] = useState([]);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Ambil data kategori dari backend
    useEffect(() => {
        api.get('/categories')
            .then(res => {
                console.log(res.data.data);  // Log data kategori untuk memastikan isi response-nya
                setCategories(res.data.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);


    // Handle perubahan input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Convert gambar ke base64
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, image: reader.result }));
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // Submit data
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            await api.post('/items', formData);
            setMessage('✅ Barang berhasil ditambahkan!');
            setFormData({
                name: '',
                category: '',
                quantity: 0,
                location: '',
                condition: '',
                image: ''
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
            <form onSubmit={handleSubmit}>
                <input name="name" type="text" placeholder="Nama Barang" onChange={handleChange} value={formData.name} className="input" required />

                <select name="category" onChange={handleChange} value={formData.category} className="input" required>
                    <option value="">Pilih Kategori</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>

                <input name="quantity" type="number" placeholder="Jumlah" onChange={handleChange} value={formData.quantity} className="input" required />
                <input name="location" type="text" placeholder="Lokasi" onChange={handleChange} value={formData.location} className="input" required />
                <input name="condition" type="text" placeholder="Kondisi" onChange={handleChange} value={formData.condition} className="input" required />

                <input type="file" accept="image/*" onChange={handleImage} className="input" />
                {preview && <img src={preview} alt="Preview" className="w-32 mt-2" />}

                <button type="submit" disabled={loading} className="btn btn-primary mt-4 w-full">
                    {loading ? 'Menyimpan...' : 'Simpan Barang'}
                </button>
            </form>
        </div>
    );
};

export default AddItemForm;
