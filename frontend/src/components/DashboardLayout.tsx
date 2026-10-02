import { Outlet } from 'react-router-dom';
import { Activity, LayoutGrid, LogOut, Sprout } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDevices } from '../context/DeviceContext';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { devices } = useDevices();
  const alerts = devices.filter(d => d.status === 'warning').length;

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 flex-col bg-emerald-950 p-4 text-emerald-50 md:flex">
        <div className="mb-8 flex items-center gap-2 text-xl font-bold"><Sprout className="text-emerald-400" /> AgriPulse</div>
        <nav className="flex-1 space-y-1">
          <span className="flex items-center gap-2 rounded-lg bg-emerald-800 px-3 py-2 text-sm font-medium">
            <LayoutGrid size={18} /> Devices
          </span>
        </nav>
        <button onClick={logout} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-emerald-200 hover:bg-emerald-900">
          <LogOut size={18} /> Sign out
        </button>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
          <div className={`flex items-center gap-2 text-sm font-medium ${alerts ? 'text-amber-600' : 'text-emerald-600'}`}>
            <Activity size={18} />
            {alerts ? `${alerts} active alert${alerts > 1 ? 's' : ''}` : 'All systems operational'}
          </div>
          <div className="text-sm text-slate-500">{user?.name}</div>
        </header>
        <main className="flex-1 p-6"><Outlet /></main>
      </div>
    </div>
  );
}