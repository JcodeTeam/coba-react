import { useState } from 'react';

export default function ItemForm({ onSubmit, initialData = {}, categories = [], rooms = [] }) {
    const [form, setForm] = useState({
        name: '',
        category: '',
        mainCategory: '',
        quantity: 0,
        location: '',
        condition: '',
        image: null,
        ...initialData
    });

    const handleChange = e => {
        const { name, value, files } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Nama Barang" required />

            <select name="mainCategory" value={form.mainCategory} onChange={handleChange} required>
                <option value="">Pilih Main Category</option>
                <option value="asset">Asset</option>
                <option value="non asset">Non Asset</option>
            </select>

            <select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Pilih Kategori</option>
                {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
            </select>

            <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="Jumlah" min="0" />

            <select name="location" value={form.location} onChange={handleChange}>
                <option value="">Pilih Ruangan</option>
                {rooms.map(room => (
                    <option key={room._id} value={room._id}>{room.name}</option>
                ))}
            </select>

            <select name="condition" value={form.condition} onChange={handleChange} required>
                <option value="">Pilih Kondisi</option>
                <option value="Baik">Baik</option>
                <option value="Rusak Ringan">Rusak Ringan</option>
                <option value="Rusak Berat">Rusak Berat</option>
            </select>

            <input type="file" name="image" onChange={handleChange} />
            <button type="submit">Simpan</button>
        </form>
    );
}
