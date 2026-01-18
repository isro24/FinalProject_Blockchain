import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; 
import { ShieldCheck, AlertCircle, Trash2, Loader2, Search, FileX } from 'lucide-react'; 
import { getAllCertificatesAPI } from '../../services/api';
import { useCertificateForm } from '../../hooks/useCertificateForm';

export default function AdminCertificateList() {
  const [certs, setCerts] = useState([]);
  const [loadingFetch, setLoadingFetch] = useState(true); 
  const [errorFetch, setErrorFetch] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const { wallet, loading: loadingTransaction, handleConnect, handleRevoke } = useCertificateForm();

  useEffect(() => {
    if (!wallet) {
        return;
    }
    
    getAllCertificatesAPI()
      .then(res => {
        if (res.success) setCerts(res.data);
        else setErrorFetch(res.message || 'Gagal mengambil data');
      })
      .catch(e => setErrorFetch(e.message))
      .finally(() => {
        setLoadingFetch(false);
      });
  }, [refreshKey, wallet]);

  const onRevokeClick = async (kodeVerifikasi) => {
    if (!wallet) {
        return Swal.fire({
            icon: 'error',
            title: 'Akses Ditolak',
            text: 'Hubungkan wallet admin dulu, Kaks!',
            confirmButtonColor: '#f97316'
        });
    }

    const result = await Swal.fire({
        title: 'Revoke Sertifikat?',
        html: `Apakah yakin ingin mencabut akses <b>${kodeVerifikasi}</b>?<br/><span style="font-size:12px; color:red">Tindakan ini permanen di Blockchain!</span>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#64748b', 
        confirmButtonText: 'Ya, Revoke!',
        cancelButtonText: 'Batal',
        reverseButtons: true,
        focusCancel: true,
        background: '#fff',
        customClass: {
            popup: 'rounded-2xl shadow-xl' 
        }
    });

    if (result.isConfirmed) {
        try {
            await handleRevoke(kodeVerifikasi);

            Swal.fire({
                title: 'Berhasil!',
                text: 'Permintaan revoke telah dikirim ke Blockchain.',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false,
                position: 'top-end',
                toast: true
            });

            setLoadingFetch(true); 
            setTimeout(() => {
                setRefreshKey(prev => prev + 1); 
            }, 3000);

        } catch (error) {
            console.error(error);
        }
    }
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto px-4 py-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <ShieldCheck size={32} />
            </div>
            Manajemen Sertifikat
          </h2>
          <p className="text-gray-600 mt-1 ml-14">Pantau dan kelola validitas sertifikat di Blockchain.</p>
        </div>
        
        {wallet && (
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-800 rounded-full border border-orange-200 text-xs font-bold font-mono shadow-sm">
                <span className="text-lg">🦊</span>
                {wallet}
            </div>
        )}
      </div>
      
      {errorFetch && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg flex items-center gap-3">
          <AlertCircle className="text-red-500" size={24} />
          <p className="text-red-800 font-medium">{errorFetch}</p>
        </div>
      )}
      
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-gray-100 min-h-100">
        {!wallet ? (
          <div className="h-100 flex flex-col items-center justify-center gap-6 bg-slate-50/50">
            <div className="p-6 bg-white rounded-full shadow-lg shadow-orange-100 animate-bounce-slight">
                <span className="text-6xl filter drop-shadow-md">🦊</span>
            </div>
            <div className="text-center max-w-md px-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Akses Terkunci</h3>
                <p className="text-gray-500 mb-6">Anda harus menghubungkan Wallet Admin (Metamask) untuk melihat data sensitif ini.</p>
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
          <>
            {loadingFetch && (
              <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex justify-center items-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 size={40} className="animate-spin text-blue-600" />
                    <span className="text-sm font-semibold text-blue-600">Sinkronisasi Data...</span>
                </div>
              </div>
            )}

            {!errorFetch && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-slate-50/80">
                      <th className="py-5 px-6 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Kode</th>
                      <th className="py-5 px-6 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Mahasiswa</th>
                      <th className="py-5 px-6 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">UKM</th>
                      <th className="py-5 px-6 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Tanggal</th>
                      <th className="py-5 px-6 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="py-5 px-6 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {certs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-20 text-center text-gray-400">
                            <div className="flex flex-col items-center gap-2">
                                <Search size={32} className="opacity-20" />
                                <span className="text-sm">Belum ada data sertifikat ditemukan.</span>
                            </div>
                        </td>
                      </tr>
                    ) : (
                      certs.map((cert) => (
                        <tr key={cert.kodeVerifikasi} className="hover:bg-blue-50/30 transition-colors">
                          <td className="py-4 px-6 font-mono text-sm font-medium text-slate-700">{cert.kodeVerifikasi}</td>
                          <td className="py-4 px-6 text-sm text-gray-900 font-semibold">{cert.namaOrang}</td>
                          <td className="py-4 px-6 text-sm text-gray-600">{cert.namaUKM}</td>
                          <td className="py-4 px-6 text-sm text-gray-500">{cert.tanggal}</td>
                          <td className="py-4 px-6">
                            {cert.isValid ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Aktif
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                                <FileX size={12} /> Revoked
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-right">
                            {cert.isValid ? (
                              <button
                                onClick={() => onRevokeClick(cert.kodeVerifikasi)}
                                disabled={loadingTransaction}
                                title="Cabut Sertifikat"
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                  loadingTransaction 
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                  : 'bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:shadow-sm'
                                }`}
                              >
                                {loadingTransaction ? (
                                    <Loader2 size={14} className="animate-spin" />
                                ) : (
                                    <Trash2 size={14} /> 
                                )}
                                {loadingTransaction ? '...' : 'Revoke'}
                              </button>
                            ) : (
                              <span className="text-xs text-gray-400 italic cursor-not-allowed select-none">
                                Non-Aktif
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {loadingTransaction && (
         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-center items-center z-99 animate-fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center animate-bounce-slight max-w-sm text-center">
               <div className="p-4 bg-red-50 rounded-full mb-4">
                 <Loader2 size={40} className="animate-spin text-red-600" />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Memproses Revoke</h3>
               <p className="text-sm text-gray-500 mb-6">
                 Silakan konfirmasi transaksi di popup Metamask Anda. Jangan tutup halaman ini.
               </p>
               <div className="text-xs font-mono bg-slate-100 px-3 py-1 rounded text-slate-500">
                 Menunggu konfirmasi blockchain...
               </div>
            </div>
         </div>
      )}
    </div>
  );
}