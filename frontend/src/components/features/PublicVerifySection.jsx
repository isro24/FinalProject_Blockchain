import { usePublicVerify } from '../../hooks/usePublicVerify';
import { Search, ShieldCheck, CheckCircle2, Calendar, User, Building2, Loader2, AlertCircle } from 'lucide-react';

const PublicVerifySection = () => {
  const { searchCode, setSearchCode, result, loading, error, handleSearch } = usePublicVerify();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 animate-fade-in">
      
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl shadow-blue-900/10 overflow-hidden border border-white/50">
        
        <div className="bg-linear-to-br from-blue-600 to-blue-700 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-10 -translate-y-10 blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full translate-x-10 translate-y-10 blur-2xl"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white/20 p-3 rounded-2xl mb-4 backdrop-blur-sm shadow-inner">
              <ShieldCheck size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Verifikasi Sertifikat</h2>
            <p className="text-blue-100 text-sm mt-2 opacity-90">Validasi keaslian data via Blockchain.</p>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-col gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Search size={20} />
              </div>
              <input 
                className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder-slate-400 font-mono text-sm shadow-sm"
                placeholder="Masukkan Kode (e.g. CERT-2026-X)"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            
            <button 
              onClick={handleSearch}
              disabled={loading || !searchCode}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-600/30 active:scale-[0.98] flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> Memeriksa...
                </>
              ) : (
                "Cek Validitas Sekarang"
              )}
            </button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 animate-fade-in-up">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-8 animate-fade-in-up">
              <div className="relative bg-white rounded-2xl border border-emerald-100 shadow-xl shadow-emerald-500/5 overflow-hidden">
                <div className="h-2 w-full bg-linear-to-r from-emerald-400 to-teal-500"></div>
                
                <div className="p-6">
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold border border-emerald-200 shadow-sm">
                      <CheckCircle2 size={14} className="fill-emerald-500 text-white" />
                      TERVERIFIKASI VALID
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">{result.namaOrang}</h3>
                    <p className="text-slate-500 text-sm mt-1">{result.namaUKM}</p>
                  </div>

                  <div className="space-y-3 bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-400">
                        <ShieldCheck size={14} /> ID Sertifikat
                      </span>
                      <span className="font-mono font-bold text-slate-700 select-all">
                        {result.kodeVerifikasi}
                      </span>
                    </div>
                    <div className="w-full h-px bg-slate-200/60"></div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-400">
                        <Calendar size={14} /> Tanggal Terbit
                      </span>
                      <span className="font-medium text-slate-700">
                        {result.tanggal}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-[10px] text-center text-slate-300 font-mono uppercase tracking-widest">
                    Secured by Ethereum Blockchain
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-xs text-slate-400">© 2026 Universitas Muhammadiyah Yogyakarta</p>
        </div>

      </div>
    </div>
  );
};

export default PublicVerifySection;