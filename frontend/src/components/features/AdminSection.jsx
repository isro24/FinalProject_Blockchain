import { useCertificateForm } from '../../hooks/useCertificateForm';
import { FilePlus, Hash, User, Building2, Calendar, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';

const AdminSection = () => {
  const { form, wallet, status, loading, handleChange, handleConnect, handleSubmit } = useCertificateForm();

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 py-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <FilePlus size={32} />
            </div>
            Terbitkan Sertifikat
          </h2>
          <p className="text-gray-600 mt-1 ml-14">Input data penerima sertifikat baru ke Blockchain.</p>
        </div>

        {wallet && (
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-800 rounded-full border border-orange-200 text-xs font-bold font-mono shadow-sm">
                <span className="text-lg">🦊</span>
                {wallet}
            </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-gray-100 min-h-100">
        
        {!wallet ? (
          <div className="h-100 flex flex-col items-center justify-center gap-6 bg-slate-50/50">
            <div className="p-6 bg-white rounded-full shadow-lg shadow-orange-100 animate-bounce-slight">
                <span className="text-6xl filter drop-shadow-md">🦊</span>
            </div>
            <div className="text-center max-w-md px-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Dashboard Terkunci</h3>
                <p className="text-gray-500 mb-6">Wajib hubungkan Wallet Admin (Owner) untuk menerbitkan sertifikat baru.</p>
                <button 
                  onClick={handleConnect}
                  className="inline-flex items-center gap-3 bg-linear-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-1 active:scale-95"
                >
                  <span className="text-2xl">🦊</span>
                  Hubungkan Metamask
                </button>
            </div>
          </div>
        ) : (
          <div className="p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Kode Verifikasi (ID Unik)</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                            <Hash size={20} />
                        </div>
                        <input 
                            type="text"
                            className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder-gray-400 font-mono"
                            placeholder="Contoh: CERT-2026-001"
                            value={form.kode}
                            onChange={(e) => handleChange(e, 'kode')}
                        />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Nama Mahasiswa</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                            <User size={20} />
                        </div>
                        <input 
                            type="text"
                            className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder-gray-400"
                            placeholder="Nama Lengkap Penerima"
                            value={form.nama}
                            onChange={(e) => handleChange(e, 'nama')}
                        />
                    </div>
                  </div>
              </div>

              <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Organisasi / UKM</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                            <Building2 size={20} />
                        </div>
                        <input 
                            type="text"
                            className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder-gray-400"
                            placeholder="Contoh: UKM Musik"
                            value={form.ukm}
                            onChange={(e) => handleChange(e, 'ukm')}
                        />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Tanggal Kegiatan</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                            <Calendar size={20} />
                        </div>
                        <input 
                            type="date"
                            className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder-gray-400 cursor-pointer"
                            value={form.tanggal}
                            onChange={(e) => handleChange(e, 'tanggal')}
                        />
                    </div>
                  </div>
              </div>

            </div>

            <div className="border-t border-slate-100 pt-8">
                <button 
                    onClick={handleSubmit} 
                    disabled={loading || !form.kode || !form.nama}
                    className={`
                        w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-3
                        ${loading || !form.kode || !form.nama
                            ? 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none' 
                            : 'bg-linear-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 hover:shadow-indigo-500/30 transform active:scale-[0.98]'
                        }
                    `}
                >
                    {loading ? (
                        <>
                            <Loader2 size={24} className="animate-spin" />
                            Sedang Mencatat ke Blockchain...
                        </>
                    ) : (
                        <>
                            <FilePlus size={24} />
                            Terbitkan Sertifikat
                        </>
                    )}
                </button>

                {status && !status.includes('revoke') && (
                    <div className={`
                        mt-6 p-4 rounded-xl border-l-4 flex items-start gap-3 animate-fade-in
                        ${status.includes('SUKSES') 
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800' 
                            : 'bg-blue-50 border-blue-500 text-blue-800'}
                    `}>
                        {status.includes('SUKSES') ? (
                            <CheckCircle2 className="shrink-0 mt-0.5" />
                        ) : (
                            <AlertTriangle className="shrink-0 mt-0.5" />
                        )}
                        <div className="text-sm font-medium font-mono break-all">
                            {status}
                        </div>
                    </div>
                )}
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSection;