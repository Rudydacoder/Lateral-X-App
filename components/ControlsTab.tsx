
import React, { useState } from 'react';

interface ControlsTabProps {
  onDisconnect: () => void;
}

const ControlsTab: React.FC<ControlsTabProps> = ({ onDisconnect }) => {
  const [activeTest, setActiveTest] = useState<string | null>(null);

  const runTest = (name: string) => {
    setActiveTest(name);
    setTimeout(() => setActiveTest(null), 1500);
  };

  return (
    <div className="p-6 space-y-6 flex flex-col h-full">
      <h2 className="text-sm font-tech text-cyan-500 uppercase tracking-widest">Manual Hardware Override</h2>

      <div className="flex-1 space-y-4">
        <ControlButton 
          label="Test Left Cable Tension" 
          isActive={activeTest === 'left'} 
          onClick={() => runTest('left')} 
        />
        <ControlButton 
          label="Test Right Cable Tension" 
          isActive={activeTest === 'right'} 
          onClick={() => runTest('right')} 
        />
        <div className="pt-8">
           <ControlButton 
            label="Emergency Release" 
            variant="danger"
            isActive={activeTest === 'emergency'} 
            onClick={() => runTest('emergency')} 
          />
        </div>
      </div>

      <div className="bg-[#1a1a1a] p-4 border border-red-950/30 rounded-xl">
        <p className="text-[10px] font-tech text-red-900 uppercase mb-2">Security Zone</p>
        <button 
          onClick={onDisconnect}
          className="w-full py-3 border border-red-900 text-red-500 text-xs font-tech uppercase hover:bg-red-950 transition-all rounded-lg"
        >
          Force Disconnect System
        </button>
      </div>
    </div>
  );
};

const ControlButton = ({ label, isActive, onClick, variant = 'primary' }: { label: string, isActive: boolean, onClick: () => void, variant?: 'primary' | 'danger' }) => (
  <button
    onClick={onClick}
    className={`w-full py-5 px-6 rounded-2xl flex justify-between items-center transition-all duration-300 border-2 font-tech uppercase text-xs tracking-widest
      ${isActive 
        ? 'scale-[0.98] bg-cyan-400 border-cyan-400 text-black' 
        : variant === 'danger' 
          ? 'bg-transparent border-red-900/50 text-red-500 hover:border-red-500' 
          : 'bg-[#1a1a1a] border-cyan-950/30 text-cyan-100 hover:border-cyan-400'
      }
    `}
  >
    <span>{label}</span>
    <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-black animate-ping' : 'bg-current opacity-20'}`}></div>
  </button>
);

export default ControlsTab;
