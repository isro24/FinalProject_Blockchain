import { useState } from 'react';
import { connectWallet, issueCertificateOnChain } from '../services/blockchain';

export function useCertificateForm() {
  const [form, setForm] = useState({ kode: '', nama: '', ukm: '', tanggal: '' });
  const [wallet, setWallet] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e, field) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleConnect = async () => {
    try {
      const account = await connectWallet();
      setWallet(account);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async () => {
    if (!wallet) return alert("Konek wallet dulu!");
    if (!form.kode || !form.nama || !form.ukm || !form.tanggal) {
      return alert("Semua data wajib diisi!");
    }

    try {
      setLoading(true);
      setStatus("⏳ Sedang memproses transaksi di Metamask...");
      
      const tx = await issueCertificateOnChain(form);
      
      setStatus("⏳ Transaksi dikirim! Menunggu konfirmasi jaringan...");
      await tx.wait();

      setStatus(`✅ SUKSES! Hash: ${tx.hash}`);
      setForm({ kode: '', nama: '', ukm: '', tanggal: '' }); 
    } catch (err) {
      console.error(err);
      const errorMsg = err.reason || err.message || "Terjadi kesalahan";
      setStatus("❌ Gagal: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    wallet,
    status,
    loading,
    handleChange,
    handleConnect,
    handleSubmit
  };
}