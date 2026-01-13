import { useState } from 'react';
import { verifyCertificateAPI } from '../services/api';

export function usePublicVerify() {
  const [searchCode, setSearchCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchCode) return;
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await verifyCertificateAPI(searchCode);

      if (data.success) {
        setResult(data.data);
      } else {
        setError("❌ Sertifikat tidak ditemukan atau ID salah.");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Gagal koneksi. Pastikan backend nyala!");
    } finally {
      setLoading(false);
    }
  };

  return {
    searchCode, setSearchCode,
    result, loading, error,
    handleSearch
  };
}