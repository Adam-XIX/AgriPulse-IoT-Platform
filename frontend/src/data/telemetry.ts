import type { Device, SensorType, TelemetryPayload, Thresholds } from '../types';

const rnd = (min: number, max: number) => +(min + Math.random() * (max - min)).toFixed(1);
const jitter = (v: number, step: number, lo: number, hi: number) =>
  +Math.min(hi, Math.max(lo, v + (Math.random() - 0.5) * step)).toFixed(1);

export const defaultThresholds: Record<SensorType, Thresholds> = {
  temperature: { min: 10, max: 35 },
  soil: { min: 25, max: 80 },
  irrigation: { min: 0, max: 20 },
  camera: { min: 10, max: 30 },
};

export const typeLabels: Record<SensorType, string> = {
  temperature: 'Temp / Humidity', soil: 'Soil Probe', irrigation: 'Irrigation', camera: 'Camera',
};

export const primaryUnit: Record<SensorType, string> = {
  temperature: '°C', soil: '% moisture', irrigation: 'L/min', camera: 'FPS',
};

export function initialTelemetry(type: SensorType): TelemetryPayload {
  const timestamp = new Date().toISOString();
  switch (type) {
    case 'temperature': return { timestamp, temperature: rnd(20, 28), humidity: rnd(45, 70) };
    case 'soil': return { timestamp, soilMoisture: rnd(35, 65), temperature: rnd(16, 24) };
    case 'irrigation': return { timestamp, flowRate: rnd(0, 12) };
    case 'camera': return { timestamp, fps: rnd(20, 30) };
  }
}

export function nextTelemetry(type: SensorType, p: TelemetryPayload): TelemetryPayload {
  const timestamp = new Date().toISOString();
  switch (type) {
    case 'temperature': return { timestamp, temperature: jitter(p.temperature ?? 24, 3, 5, 45), humidity: jitter(p.humidity ?? 60, 4, 20, 95) };
    case 'soil': return { timestamp, soilMoisture: jitter(p.soilMoisture ?? 50, 8, 5, 95), temperature: jitter(p.temperature ?? 20, 1, 5, 35) };
    case 'irrigation': return { timestamp, flowRate: jitter(p.flowRate ?? 6, 5, 0, 25) };
    case 'camera': return { timestamp, fps: jitter(p.fps ?? 25, 12, 3, 30) };
  }
}

export function primaryValue(d: Pick<Device, 'type' | 'telemetry'>): number {
  const t = d.telemetry;
  return (d.type === 'temperature' ? t.temperature : d.type === 'soil' ? t.soilMoisture
    : d.type === 'irrigation' ? t.flowRate : t.fps) ?? 0;
}

export function formatTelemetry(d: Pick<Device, 'type' | 'telemetry'>): string {
  const t = d.telemetry;
  switch (d.type) {
    case 'temperature': return `${t.temperature}°C | ${t.humidity}% Humidity`;
    case 'soil': return `${t.soilMoisture}% Moisture | ${t.temperature}°C Soil`;
    case 'irrigation': return `${t.flowRate} L/min | ${(t.flowRate ?? 0) > 0 ? 'Valve Open' : 'Valve Closed'}`;
    case 'camera': return `${t.fps} FPS | Streaming`;
  }
}