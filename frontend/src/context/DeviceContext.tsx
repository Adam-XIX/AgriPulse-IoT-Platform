import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Device, LogEntry, NewDeviceInput, Thresholds } from '../types';
import { mockDevices } from '../data/mockDevices';
import { defaultThresholds, initialTelemetry, nextTelemetry, primaryValue } from '../data/telemetry';

interface DeviceCtx {
  devices: Device[];
  addDevice: (input: NewDeviceInput) => void;
  removeDevice: (id: string) => void;
  toggleDevice: (id: string) => void;
  updateThresholds: (id: string, t: Thresholds) => void;
}

const Ctx = createContext<DeviceCtx | null>(null);
const log = (level: LogEntry['level'], message: string): LogEntry =>
  ({ id: crypto.randomUUID(), timestamp: new Date().toISOString(), level, message });

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [devices, setDevices] = useState<Device[]>(mockDevices);

  // Mock real-time feed. Replace this effect with a WebSocket subscription later.
  useEffect(() => {
    const t = setInterval(() => {
      setDevices(prev => prev.map(d => {
        if (d.status === 'offline') return d;
        const telemetry = nextTelemetry(d.type, d.telemetry);
        const v = primaryValue({ type: d.type, telemetry });
        const breach = v < d.thresholds.min || v > d.thresholds.max;
        const status = breach ? 'warning' : 'online';
        const logs = status !== d.status
          ? [log(breach ? 'warn' : 'info', breach ? `Threshold breached (reading ${v})` : 'Reading back in range'), ...d.logs].slice(0, 30)
          : d.logs;
        return { ...d, telemetry, status, logs };
      }));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const addDevice = (input: NewDeviceInput) => {
    const device: Device = {
      ...input,
      id: `ND-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      status: 'online',
      telemetry: initialTelemetry(input.type),
      thresholds: defaultThresholds[input.type],
      logs: [log('info', 'Node added from dashboard')],
    };
    setDevices(p => [device, ...p]);
  };

  const removeDevice = (id: string) => setDevices(p => p.filter(d => d.id !== id));

  const toggleDevice = (id: string) =>
    setDevices(p => p.map(d => d.id !== id ? d : {
      ...d,
      status: d.status === 'offline' ? 'online' : 'offline',
      logs: [log('info', d.status === 'offline' ? 'Node powered on' : 'Node powered off'), ...d.logs].slice(0, 30),
    }));

  const updateThresholds = (id: string, thresholds: Thresholds) =>
    setDevices(p => p.map(d => d.id !== id ? d : {
      ...d, thresholds,
      logs: [log('info', `Thresholds updated to ${thresholds.min}–${thresholds.max}`), ...d.logs].slice(0, 30),
    }));

  return <Ctx.Provider value={{ devices, addDevice, removeDevice, toggleDevice, updateThresholds }}>{children}</Ctx.Provider>;
}

export const useDevices = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useDevices must be used within DeviceProvider');
  return c;
};