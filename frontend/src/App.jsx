import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import PublicVerifySection from './components/features/PublicVerifySection';
import AdminSection from './components/features/AdminSection';
import AdminAllCertificates from './components/features/AdminCertifivateList'; // Pastikan path import ini benar sesuai nama file

function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={<PublicVerifySection />} 
      />

      <Route
        path="/admin/*"
        element={
          <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
            
            <Navbar />

            <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
              <Routes>
                <Route path="" element={<AdminSection />} />
                <Route path="all" element={<AdminAllCertificates />} />
              </Routes>
            </main>

            <footer className="text-center text-xs text-slate-400 py-6 border-t border-slate-200 bg-white">
              <p>© 2026 Universitas Muhammadiyah Yogyakarta</p>
              <p className="mt-1">Blockchain Validator System</p>
            </footer>
            
          </div>
        }
      />
    </Routes>
  );
}

export default App;