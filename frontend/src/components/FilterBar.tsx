import { Search } from 'lucide-react';
import type { DeviceStatus, SensorType } from '../types';
import { typeLabels } from '../data/telemetry';

export interface Filters { query: string; type: SensorType | 'all'; status: DeviceStatus | 'all'; }

export default function FilterBar({ filters, onChange }: { filters: Filters; onChange: (f: Filters) => void }) {
  const select = 'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm';
  return (
    <div className="flex flex-wrap gap-3">
      <div className="relative min-w-56 flex-1">
        <Search size={16} className="absolute left-3 top-3 text-slate-400" />
        <input value={filters.query} onChange={e => onChange({ ...filters, query: e.target.value })}
          placeholder="Search name, ID or location…"
          className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm" />
      </div>
      <select className={select} value={filters.type} onChange={e => onChange({ ...filters, type: e.target.value as Filters['type'] })}>
        <option value="all">All types</option>
        {Object.entries(typeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </select>
      <select className={select} value={filters.status} onChange={e => onChange({ ...filters, status: e.target.value as Filters['status'] })}>
        <option value="all">All statuses</option>
        <option value="online">Online</option>
        <option value="offline">Offline</option>
        <option value="warning">Warning</option>
      </select>
    </div>
  );
}