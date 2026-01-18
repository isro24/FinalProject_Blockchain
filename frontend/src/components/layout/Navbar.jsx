import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FilePlus, ShieldCheck } from 'lucide-react';

const navItems = [
  { path: '/admin', label: 'Terbitkan', icon: <FilePlus size={18} /> },
  { path: '/admin/all', label: 'Data Sertifikat', icon: <LayoutDashboard size={18} /> },
];

export default function AdminHeader() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-blue-700 to-indigo-800 shadow-lg text-white">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        <Link to="/admin" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 border border-white/20 text-white shadow-inner group-hover:bg-white/20 transition-all">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight text-white">
              Portal<span className="text-blue-200">Admin</span>
            </h1>
            <p className="text-[10px] font-medium text-blue-200 mt-0.5 tracking-wider uppercase opacity-80">
              Blockchain System
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {navItems.map(item => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                  ${active
                    ? 'bg-white text-blue-700 shadow-md translate-y-0' 
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
}