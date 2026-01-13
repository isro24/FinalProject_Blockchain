import { Routes, Route } from 'react-router-dom';
import PublicVerifySection from './components/features/PublicVerifySection';
import AdminSection from './components/features/AdminSection';

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        <div className="bg-blue-600 px-6 py-8 text-center border-b border-blue-700">
          <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-md">
            🎓 Portal Sertifikat
          </h1>
          <p className="text-blue-100 text-sm mt-2 opacity-90">
            Sistem Validasi & Penerbitan Berbasis Blockchain
          </p>
        </div>

        <div className="p-8">
          <Routes>
            <Route path="/" element={<PublicVerifySection />} />
            <Route path="/admin" element={<AdminSection />} />
          </Routes>
        </div>

      </div>
      
      <div className="mt-8 text-center text-xs text-gray-400">
        &copy; 2026 Universitas Muhammadiyah Yogyakarta
      </div>

    </div>
  );
}

export default App;