import { usePublicVerify } from '../../hooks/usePublicVerify';

const PublicVerifySection = () => {
  const { searchCode, setSearchCode, result, loading, error, handleSearch } = usePublicVerify();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-gray-800">Cek Validitas Sertifikat</h2>
        <p className="text-gray-500 text-sm mt-1">Masukkan ID unik yang tertera pada sertifikat.</p>
      </div>

      <div className="flex gap-2">
        <input 
          className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none placeholder-gray-400 shadow-sm"
          placeholder="Contoh: SKRIPSI-FINAL-01"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
        />
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-bold transition-all disabled:opacity-50 shadow-md"
        >
          {loading ? "..." : "Cek"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm">
            TERDAFTAR
          </div>
          
          <div className="text-center mb-6">
            <div className="inline-block p-3 rounded-full bg-white border border-gray-200 text-green-600 mb-2 shadow-sm">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{result.namaOrang}</h3>
            <p className="text-gray-500 text-sm font-medium">{result.namaUKM}</p>
          </div>

          <div className="space-y-3 text-sm border-t border-gray-200 pt-4 bg-white p-4 rounded-lg border">
            <div className="flex justify-between">
              <span className="text-gray-500">ID Sertifikat</span>
              <span className="text-gray-800 font-mono font-bold">{result.kodeVerifikasi}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tanggal Event</span>
              <span className="text-gray-800">{result.tanggal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Status Blockchain</span>
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold border border-green-200">
                VERIFIED
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicVerifySection;