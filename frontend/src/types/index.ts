export type SensorType = 'temperature' | 'camera' | 'irrigation' | 'soil';
export type DeviceStatus = 'online' | 'offline' | 'warning';

export interface TelemetryPayload {
  timestamp: string;
  temperature?: number;   // °C
  humidity?: number;      // %
  soilMoisture?: number;  // %
  flowRate?: number;      // L/min
  fps?: number;           // camera stream
}

export interface Thresholds { min: number; max: number; }

export interface LogEntry { id: string; timestamp: string; level: 'info' | 'warn'; message: string; }

export interface Device {
  id: string;
  name: string;
  type: SensorType;
  status: DeviceStatus;
  pin: string;
  location: string;
  telemetry: TelemetryPayload;
  thresholds: Thresholds; // applies to the type's primary metric
  logs: LogEntry[];
}

export type NewDeviceInput = Pick<Device, 'name' | 'type' | 'pin' | 'location'>;