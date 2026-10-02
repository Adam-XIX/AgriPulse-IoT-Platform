import { AlertTriangle, Cpu, Wifi, WifiOff } from 'lucide-react';
import type { Device } from '../types';

export default function StatsSummary({ devices }: { devices: Device[] }) {
  const stats = [
    { label: 'Total Devices', value: devices.length, icon: Cpu, color: 'text-slate-600 bg-slate-100' },
    { label: 'Online', value: devices.filter(d => d.status === 'online').length, icon: Wifi, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Offline', value: devices.filter(d => d.status === 'offline').length, icon: WifiOff, color: 'text-slate-500 bg-slate-100' },
    { label: 'Alerts', value: devices.filter(d => d.status === 'warning').length, icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map(({ label, value, icon: Icon, color }) => (
        <div key={label} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4">
          <div className={`rounded-lg p-3 ${color}`}><Icon size={22} /></div>
          <div><div className="text-2xl font-bold">{value}</div><div className="text-sm text-slate-500">{label}</div></div>
        </div>
      ))}
    </div>
  );
}