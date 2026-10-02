import { useState } from 'react';
import Modal from './Modal';
import { useDevices } from '../context/DeviceContext';
import { formatTelemetry, primaryUnit, typeLabels } from '../data/telemetry';

export default function DeviceDetailModal({ deviceId, onClose }: { deviceId: string; onClose: () => void }) {
  const { devices, updateThresholds } = useDevices();
  const device = devices.find(d => d.id === deviceId);
  const [min, setMin] = useState(device?.thresholds.min ?? 0);
  const [max, setMax] = useState(device?.thresholds.max ?? 0);
  if (!device) return null;

  const input = 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm';
  return (
    <Modal title={device.name} onClose={onClose}>
      <div className="space-y-5">
        <div className="text-sm text-slate-500">
          {device.id} · {typeLabels[device.type]} · {device.pin} · {device.location}
        </div>
        <div className="rounded-lg bg-slate-50 px-3 py-3 font-mono text-sm">
          {device.status === 'offline' ? 'No signal' : formatTelemetry(device)}
        </div>

        <section>
          <h3 className="mb-2 text-sm font-semibold">Alert thresholds ({primaryUnit[device.type]})</h3>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm">Min<input type="number" className={input} value={min} onChange={e => setMin(+e.target.value)} /></label>
            <label className="text-sm">Max<input type="number" className={input} value={max} onChange={e => setMax(+e.target.value)} /></label>
          </div>
          <button disabled={min >= max} onClick={() => updateThresholds(device.id, { min, max })}
            className="mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-40">
            Save thresholds
          </button>
        </section>

        <section>
          <h3 className="mb-2 text-sm font-semibold">Logs</h3>
          <ul className="max-h-48 space-y-1 overflow-y-auto rounded-lg bg-slate-900 p-3 font-mono text-xs">
            {device.logs.map(l => (
              <li key={l.id} className={l.level === 'warn' ? 'text-amber-300' : 'text-slate-300'}>
                [{new Date(l.timestamp).toLocaleTimeString()}] {l.message}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Modal>
  );
}