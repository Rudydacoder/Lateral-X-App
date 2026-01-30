
import React, { useState, useEffect, useCallback } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { UserSession, TelemetryData } from '../types';

interface DashboardPageProps {
  session: UserSession;
  onDisconnect: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ session, onDisconnect }) => {
  const [telemetry, setTelemetry] = useState<TelemetryData[]>([]);
  const [currentBio, setCurrentBio] = useState({
    hr: 72,
    battery: 88,
    angle: 45,
    stress: 0.12
  });

  // Mock real-time data generation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      
      const newDataPoint: TelemetryData = {
        time: timeStr,
        heartRate: 70 + Math.random() * 10,
        battery: 88 - (telemetry.length * 0.01),
        jointAngle: 30 + Math.sin(Date.now() / 1000) * 20,
        stressLevel: Math.random() * 0.2
      };

      setTelemetry(prev => [...prev.slice(-19), newDataPoint]);
      setCurrentBio({
        hr: Math.round(newDataPoint.heartRate),
        battery: Math.round(newDataPoint.battery),
        angle: Math.round(newDataPoint.jointAngle),
        stress: parseFloat(newDataPoint.stressLevel.toFixed(2))
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [telemetry.length]);

  return (
    <div className="p-4 md:p-8 min-h-screen relative z-20 max-w-7xl mx-auto flex flex-col">
      {/* Header Bar */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-cyan-900 pb-4 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-cyan-400 glow-text-cyan flex items-center gap-3">
            <span className="bg-cyan-500 w-2 h-8 inline-block"></span>
            LATERAL-X DASHBOARD
          </h2>
          <p className="text-xs font-tech text-slate-500 mt-1">
            USER: <span className="text-cyan-600">{session.patientId}</span> | UNIT: <span className="text-cyan-600">{session.unitId}</span>
          </p>
        </div>
        <button 
          onClick={onDisconnect}
          className="text-xs font-tech border border-red-900 text-red-700 px-4 py-2 hover:bg-red-950 transition-colors uppercase"
        >
          Terminate Session
        </button>
      </header>

      {/* Grid Layout */}
      <main className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* KPI Cards */}
        <StatCard label="HEART RATE" value={`${currentBio.hr} BPM`} trend="+2%" color="text-cyan-400" />
        <StatCard label="EXO BATTERY" value={`${currentBio.battery}%`} trend="-0.1%" color="text-green-400" />
        <StatCard label="JOINT ANGLE" value={`${currentBio.angle}°`} trend="Optimal" color="text-cyan-400" />
        <StatCard label="BIO-STRESS" value={currentBio.stress} trend="Stable" color="text-blue-400" />

        {/* Main Chart Area */}
        <div className="md:col-span-3 bg-[#1a1a1a] border border-cyan-900 rounded-xl p-6 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-tech text-cyan-500 uppercase">Live Joint Mobility Telemetry</h3>
            <span className="flex items-center gap-2 text-[10px] text-green-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              STREAMING_LIVE
            </span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetry}>
                <defs>
                  <linearGradient id="colorAngle" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis dataKey="time" stroke="#555" fontSize={10} />
                <YAxis stroke="#555" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #0891b2', borderRadius: '8px' }}
                  labelStyle={{ color: '#0891b2', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="jointAngle" stroke="#22d3ee" strokeWidth={2} fillOpacity={1} fill="url(#colorAngle)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-[#1a1a1a] border border-cyan-900 rounded-xl p-4">
            <h3 className="text-[10px] font-tech text-cyan-700 uppercase mb-4 tracking-widest">Diagnostics</h3>
            <ul className="space-y-3 text-xs font-tech">
              <li className="flex justify-between">
                <span className="text-slate-500">Link Integrity:</span>
                <span className="text-green-500">99.2%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Motor Temp:</span>
                <span className="text-cyan-400">32.4°C</span>
              </li>
              <li className="flex justify-between">
                <span className="text-slate-500">Sync Offset:</span>
                <span className="text-cyan-400">2ms</span>
              </li>
            </ul>
          </div>

          <div className="bg-cyan-950/20 border border-cyan-900 rounded-xl p-4 flex-1">
            <h3 className="text-[10px] font-tech text-cyan-400 uppercase mb-2">AI Assistant Note</h3>
            <p className="text-[11px] text-cyan-100 leading-relaxed italic opacity-80">
              "Movement patterns suggest slight fatigue in L3-L4 region. Support torque increased by 15% to compensate."
            </p>
          </div>
        </div>

        {/* Heart Rate Strip Chart */}
        <div className="md:col-span-4 bg-[#1a1a1a] border border-cyan-900 rounded-xl p-4 h-32 overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetry}>
              <Line type="step" dataKey="heartRate" stroke="#ef4444" dot={false} strokeWidth={1} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </main>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  trend: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, color }) => (
  <div className="bg-[#1a1a1a] border border-cyan-900 p-4 rounded-xl flex flex-col justify-between group hover:border-cyan-400 transition-colors">
    <p className="text-[10px] font-tech text-slate-500 uppercase tracking-widest mb-2">{label}</p>
    <div className="flex items-end justify-between">
      <h4 className={`text-2xl font-bold ${color} glow-text-cyan`}>{value}</h4>
      <span className="text-[9px] font-tech text-slate-600 bg-black/40 px-2 py-1 rounded">{trend}</span>
    </div>
  </div>
);

export default DashboardPage;
