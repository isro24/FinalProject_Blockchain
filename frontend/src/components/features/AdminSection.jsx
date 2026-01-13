import { useCertificateForm } from '../../hooks/useCertificateForm';
import InputGroup from '../common/InputGroup';

const AdminSection = () => {
  const { form, wallet, status, loading, handleChange, handleConnect, handleSubmit } = useCertificateForm();

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Dashboard Penerbit</h2>
        <p className="text-gray-500 text-sm">Terbitkan sertifikat baru ke Blockchain.</p>
      </div>

      {!wallet ? (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <button 
            onClick={handleConnect}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            <span>🦊</span> Hubungkan Metamask
          </button>
          <p className="text-gray-400 text-xs mt-3">Wajib menggunakan wallet terdaftar (Owner).</p>
        </div>
      ) : (
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center mb-6">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Wallet Terhubung</p>
            <p className="font-mono font-bold text-blue-800 text-xs break-all mt-1">{wallet}</p>
          </div>

          <div className="space-y-4">
            <InputGroup 
              label="Kode Verifikasi (ID Unik)" 
              placeholder="Contoh: CERT-2026-001" 
              value={form.kode} 
              onChange={(e) => handleChange(e, 'kode')} 
            />
            
            <InputGroup 
              label="Nama Mahasiswa" 
              placeholder="Nama Lengkap Penerima" 
              value={form.nama} 
              onChange={(e) => handleChange(e, 'nama')} 
            />
            
            <InputGroup 
              label="Nama UKM / Organisasi" 
              placeholder="Contoh: UKM Musik" 
              value={form.ukm} 
              onChange={(e) => handleChange(e, 'ukm')} 
            />
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Kegiatan</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" 
                value={form.tanggal} 
                onChange={(e) => handleChange(e, 'tanggal')} 
              />
            </div>

            <button 
              onClick={handleSubmit} 
              disabled={loading}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-md mt-4 transition-all ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform active:scale-[0.99]'
              }`}
            >
              {loading ? "Sedang Memproses..." : "🚀 Terbitkan Sertifikat"}
            </button>

            {status && (
              <div className={`mt-4 p-4 rounded-lg border text-sm font-mono break-all ${
                status.includes('SUKSES') 
                  ? 'bg-green-50 border-green-200 text-green-700' 
                  : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                {status}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminSection;