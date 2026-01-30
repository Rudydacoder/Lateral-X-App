
export enum ConnectionStatus {
  DISCONNECTED = 'Disconnected',
  SCANNING = 'Scanning...',
  CONNECTED = 'Connected to ESP32',
}

export interface TelemetryData {
  time: string;
  heartRate: number;
  battery: number;
  jointAngle: number;
  stressLevel: number;
}

export interface UserSession {
  patientId: string;
  isConnected: boolean;
  unitId: string;
}
