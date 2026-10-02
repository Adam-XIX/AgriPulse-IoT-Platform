import type { Device } from '../types';
import { defaultThresholds, initialTelemetry } from './telemetry';

const make = (id: string, name: string, type: Device['type'], pin: string, location: string,
  status: Device['status'] = 'online'): Device => ({
  id, name, type, pin, location, status,
  telemetry: initialTelemetry(type),
  thresholds: defaultThresholds[type],
  logs: [{ id: `${id}-l0`, timestamp: new Date().toISOString(), level: 'info', message: 'Node registered and handshake OK' }],
});

export const mockDevices: Device[] = [
  make('ND-004', 'Field-A Temp Sensor #04', 'temperature', 'GPIO4', 'Field A'),
  make('ND-007', 'Field-B Soil Probe #07', 'soil', 'ADC1_CH6', 'Field B'),
  make('ND-012', 'Greenhouse Irrigation #12', 'irrigation', 'GPIO26', 'Greenhouse 1'),
  make('ND-015', 'Barn Gate Camera #15', 'camera', 'CSI-0', 'Barn', 'offline'),
  make('ND-021', 'Field-C Temp Sensor #21', 'temperature', 'GPIO5', 'Field C'),
  make('ND-023', 'Orchard Soil Probe #23', 'soil', 'ADC1_CH3', 'Orchard'),
];