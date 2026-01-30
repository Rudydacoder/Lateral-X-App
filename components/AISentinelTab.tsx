
import React, { useState, useEffect } from 'react';

const AISentinelTab: React.FC = () => {
  const [logs, setLogs] = useState<string[]>(['[0.00s] SYSTEM_INIT: SENTINEL_V1.4 ONLINE']);
  const [stability, setStability] = useState(94);

  useEffect(() => {
    const events = [
      "Standard Gait Detected (Confidence: 99.8%)",
      "Lateral Drift Noted - Adjusting L_Servo",
      "Micro-stumble Detected - Triggering Hydraulic_Lock",
      "Terrain Analysis: Uneven Surface Detected",
      "Optimizing Power Flow for Slope_Ascent",
      "Balance Corrected (Response Time: 4ms)"
    ];

    const timer = setInterval(() => {
      const event = events[Math.floor(Math.random() * events.length)];
      const timestamp = (performance.now() / 1000).toFixed(2);
      setLogs(prev => [`[${timestamp}s] ${event}`, ...prev.slice(0, 15)]);
      setStability(prev => Math.max(70, Math.min(100, prev + (Math.random() > 0.5 ? 1 : -1))));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-6 space-y-6 flex flex-col h-full">
      <h2 className="text-sm font-tech text-cyan-500 uppercase tracking-widest">AI Sentinel Dashboard</h2>

      {/* Stability Score - Fixed SVG Viewbox and Container */}
      <div className="flex flex-col items-center py-8 bg-cyan-950/10 border border-cyan-900/30 rounded-3xl relative overflow-visible">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90 overflow-visible">
            {/* Background Track */}
            <circle 
              cx="80" 
              cy="80" 
              r="70" 
              fill="none" 
              stroke="#083344" 
              strokeWidth="12" 
            />
            {/* Active Progress */}
            <circle 
              cx="80" 
              cy="80" 
              r="70" 
              fill="none" 
              stroke="#22d3ee" 
              strokeWidth="12" 
              strokeDasharray="440" 
              strokeDashoffset={440 - (440 * stability) / 100}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.6))' }}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-5xl font-bold font-tech text-cyan-400 glow-text-cyan">{stability}%</span>
            <span className="text-[10px] font-tech text-slate-500 uppercase tracking-widest">Stability</span>
          </div>
        </div>
      </div>

      {/* Real-time Wave Graph */}
      <div className="bg-[#1a1a1a] p-4 border border-cyan-950 rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-tech text-cyan-700 uppercase">Gait Anomaly Detection</span>
          <span className="text-[9px] font-tech text-green-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            NOMINAL
          </span>
        </div>
        <div className="h-16 w-full flex items-center overflow-hidden bg-black/20 rounded">
           <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="w-full h-full">
              <path 
                d="M-20,10 Q-15,0 -10,10 T0,10 T10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10 T110,10 T120,10" 
                fill="none" 
                stroke="#22d3ee" 
                strokeWidth="0.8"
                className="animate-wave"
              />
           </svg>
        </div>
      </div>

      {/* Logs Window */}
      <div className="bg-black border border-cyan-950 rounded-xl p-4 flex-1 min-h-0 flex flex-col">
        <div className="flex items-center gap-2 mb-2 border-b border-cyan-950/30 pb-2">
          <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
          <span className="text-[9px] font-tech text-cyan-800 uppercase tracking-widest">Real-time ML_LOG_STREAM</span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
          {logs.map((log, i) => (
            <p key={i} className={`text-[10px] font-tech leading-tight ${i === 0 ? 'text-cyan-400' : 'text-slate-600'}`}>
              <span className="opacity-40">{log.substring(0, 8)}</span>
              <span className="ml-2">{log.substring(8)}</span>
            </p>
          ))}
        </div>
      </div>

      <style>{`
        .animate-wave {
          animation: wave-move 3s linear infinite;
        }
        @keyframes wave-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(-40px); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #083344;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default AISentinelTab;
