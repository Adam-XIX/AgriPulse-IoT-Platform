import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useDevices } from '../context/DeviceContext';
import StatsSummary from '../components/StatsSummary';
import FilterBar, { type Filters } from '../components/FilterBar';
import DeviceCard from '../components/DeviceCard';
import AddDeviceModal from '../components/AddDeviceModal';
import DeviceDetailModal from '../components/DeviceDetailModal';

export default function DevicesPage() {
  const { devices, addDevice, removeDevice, toggleDevice } = useDevices();
  const [filters, setFilters] = useState<Filters>({ query: '', type: 'all', status: 'all' });
  const [showAdd, setShowAdd] = useState(false);
  const [configId, setConfigId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return devices.filter(d =>
      (filters.type === 'all' || d.type === filters.type) &&
      (filters.status === 'all' || d.status === filters.status) &&
      (!q || [d.name, d.id, d.location].some(s => s.toLowerCase().includes(q))));
  }, [devices, filters]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Devices</h1>
        <button onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
          <Plus size={18} /> Add Node
        </button>
      </div>

      <StatsSummary devices={devices} />
      <FilterBar filters={filters} onChange={setFilters} />

      {visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-16 text-center text-slate-500">No devices match your filters.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map(d => (
            <DeviceCard key={d.id} device={d}
              onToggle={() => toggleDevice(d.id)}
              onConfigure={() => setConfigId(d.id)}
              onDelete={() => { if (confirm(`Delete ${d.name}?`)) removeDevice(d.id); }} />
          ))}
        </div>
      )}

      {showAdd && <AddDeviceModal onClose={() => setShowAdd(false)} onAdd={addDevice} />}
      {configId && <DeviceDetailModal deviceId={configId} onClose={() => setConfigId(null)} />}
    </div>
  );
}