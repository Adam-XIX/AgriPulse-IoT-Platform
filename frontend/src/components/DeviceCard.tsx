import { Camera, Droplets, MapPin, Power, Settings, Sprout, Thermometer, Trash2, type LucideIcon } from 'lucide-react';
import type { Device, DeviceStatus, SensorType } from '../types';
import { formatTelemetry } from '../data/telemetry';

const icons: Record<SensorType, LucideIcon> = { temperature: Thermometer, camera: Camera, irrigation: Droplets, soil: Sprout };
const badge: Record<DeviceStatus, string> = {
  online: 'bg-emerald-100 text-emerald-700',
  offline: 'bg-slate-100 text-slate-500',
  warning: 'bg-amber-100 text-amber-700',
};
const dot: Record<DeviceStatus, string> = { online: 'bg-emerald-500', offline: 'bg-slate-400', warning: 'bg-amber-500' };

interface Props { device: Device; onToggle: () => void; onConfigure: () => void; onDelete: () => void; }

export default function DeviceCard({ device, onToggle, onConfigure, onDelete }: Props) {
  const Icon = icons[device.type];
  const off = device.status === 'offline';
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-50 p-2 text-emerald-700"><Icon size={20} /></div>
          <div>
            <div className="font-semibold leading-tight">{device.name}</div>
            <div className="text-xs text-slate-500">{device.id} · {device.pin}</div>
          </div>
        </div>
        <span className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium capitalize ${badge[device.status]}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${dot[device.status]} ${off ? '' : 'animate-pulse'}`} />
          {device.status}
        </span>
      </div>

      <div className={`rounded-lg bg-slate-50 px-3 py-3 font-mono text-sm ${off ? 'text-slate-400' : ''}`}>
        {off ? 'No signal' : formatTelemetry(device)}
      </div>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin size={14} />{device.location}</span>
        <div className="flex gap-1">
          <button onClick={onToggle} title={off ? 'Power on' : 'Power off'}
            className={`rounded-lg p-2 hover:bg-slate-100 ${off ? 'text-slate-400' : 'text-emerald-600'}`}><Power size={18} /></button>
          <button onClick={onConfigure} title="Configure" className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"><Settings size={18} /></button>
          <button onClick={onDelete} title="Delete" className="rounded-lg p-2 text-red-500 hover:bg-red-50"><Trash2 size={18} /></button>
        </div>
      </div>
    </div>
  );
}