import { useState, type FormEvent } from 'react';
import Modal from './Modal';
import type { NewDeviceInput, SensorType } from '../types';
import { typeLabels } from '../data/telemetry';

export default function AddDeviceModal({ onClose, onAdd }: { onClose: () => void; onAdd: (d: NewDeviceInput) => void }) {
  const [form, setForm] = useState<NewDeviceInput>({ name: '', type: 'temperature', pin: '', location: '' });
  const set = <K extends keyof NewDeviceInput>(k: K, v: NewDeviceInput[K]) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e: FormEvent) => { e.preventDefault(); onAdd(form); onClose(); };
  const input = 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm';

  return (
    <Modal title="Add New Hardware Node" onClose={onClose}>
      <form onSubmit={submit} className="space-y-4">
        <label className="block text-sm font-medium">Device Name
          <input required className={input} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Field-A Temp Sensor #05" />
        </label>
        <label className="block text-sm font-medium">Type
          <select className={input} value={form.type} onChange={e => set('type', e.target.value as SensorType)}>
            {Object.entries(typeLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </label>
        <label className="block text-sm font-medium">Sensor Pin / ID
          <input required className={input} value={form.pin} onChange={e => set('pin', e.target.value)} placeholder="GPIO4" />
        </label>
        <label className="block text-sm font-medium">Location
          <input required className={input} value={form.location} onChange={e => set('location', e.target.value)} placeholder="Field A" />
        </label>
        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm hover:bg-slate-100">Cancel</button>
          <button type="submit" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">Add Node</button>
        </div>
      </form>
    </Modal>
  );
}