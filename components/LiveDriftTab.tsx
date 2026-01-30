
import React, { useState } from 'react';
import PressureHeatmap from './PressureHeatmap';

const LiveDriftTab: React.FC = () => {
  const [shift, setShift] = useState(0); // -1.0 to 1.0

  // Calculate intensities
  const leftIntensity = Math.max(0.1, Math.min(1.0, 0.4 - shift));
  const rightIntensity = Math.max(0.1, Math.min(1.0, 0.4 + shift));

  return (
    <div className="p-6 flex flex-col items-center h-full">
      <div className="w-full mb-2 flex justify-between items-baseline">
        <h2 className="text-sm font-tech text-cyan-500 uppercase tracking-widest">Live Drift Monitor</h2>
        <span className="text-[10px] font-tech text-slate-500 uppercase">Sync_Freq: 120Hz</span>
      </div>

      {/* Heatmap Section */}
      <div className="flex-1 w-full flex flex-col justify-center items-center py-4">
        <PressureHeatmap leftIntensity={leftIntensity} rightIntensity={rightIntensity} />
      </div>

      {/* Simulation Slider */}
      <div className="w-full bg-[#1a1a1a] p-5 border border-cyan-950 rounded-2xl shadow-inner">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-tech text-cyan-800 uppercase">Left Load</span>
          <span className="text-[10px] font-tech text-cyan-400 uppercase tracking-widest font-bold">Simulate Weight Shift</span>
          <span className="text-[10px] font-tech text-cyan-800 uppercase">Right Load</span>
        </div>
        
        <input 
          type="range"
          min="-1"
          max="1"
          step="0.01"
          value={shift}
          onChange={(e) => setShift(parseFloat(e.target.value))}
          className="w-full h-1 bg-cyan-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        <div className="mt-4 flex justify-between gap-4">
          <div className="flex-1 bg-black/40 p-2 rounded border border-cyan-900/30 text-center">
            <p className="text-[9px] text-slate-600 font-tech uppercase">L_Pressure</p>
            <p className="text-sm font-tech text-cyan-400">{Math.round(leftIntensity * 100)}%</p>
          </div>
          <div className="flex-1 bg-black/40 p-2 rounded border border-cyan-900/30 text-center">
            <p className="text-[9px] text-slate-600 font-tech uppercase">R_Pressure</p>
            <p className="text-sm font-tech text-cyan-400">{Math.round(rightIntensity * 100)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDriftTab;
