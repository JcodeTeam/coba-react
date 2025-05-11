import React, { useState } from 'react';
import axios from 'axios';

const ReportExportForm = () => {
    const [periode, setPeriode] = useState('bulan');
    const [tahun, setTahun] = useState(new Date().getFullYear());
    const [bulan, setBulan] = useState('1');
    const [semester, setSemester] = useState('1');

    const handleDownload = async () => {
        let url = `/api/export?periode=${periode}&tahun=${tahun}`;

        if (periode === 'bulan') url += `&bulan=${bulan}`;
        if (periode === 'semester') url += `&semester=${semester}`;

        try {
            const response = await axios.get(url, {
                responseType: 'blob',
            });

            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = `laporan-${periode}-${tahun}.xlsx`;
            link.click();
        } catch (err) {
            alert('Gagal mengunduh laporan.');
            console.error(err);
        }
    };

    return (
        <div className="p-4 border rounded shadow w-full max-w-md space-y-4 bg-white">
            <h2 className="text-lg font-bold">Export Laporan Excel</h2>
            <div>
                <label className="block font-medium">Periode</label>
                <select
                    className="w-full p-2 border rounded"
                    value={periode}
                    onChange={(e) => setPeriode(e.target.value)}
                >
                    <option value="bulan">Per Bulan</option>
                    <option value="semester">Per Semester</option>
                    <option value="tahun">Per Tahun</option>
                </select>
            </div>

            <div>
                <label className="block font-medium">Tahun</label>
                <input
                    type="number"
                    className="w-full p-2 border rounded"
                    value={tahun}
                    onChange={(e) => setTahun(e.target.value)}
                />
            </div>

            {periode === 'bulan' && (
                <div>
                    <label className="block font-medium">Bulan</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={bulan}
                        onChange={(e) => setBulan(e.target.value)}
                    >
                        {[...Array(12)].map((_, i) => (
                            <option value={i + 1} key={i}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {periode === 'semester' && (
                <div>
                    <label className="block font-medium">Semester</label>
                    <select
                        className="w-full p-2 border rounded"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                    >
                        <option value="1">Semester 1</option>
                        <option value="2">Semester 2</option>
                    </select>
                </div>
            )}

            <button
                onClick={handleDownload}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Unduh Excel
            </button>
        </div>
    );
};

export default ReportExportForm;
