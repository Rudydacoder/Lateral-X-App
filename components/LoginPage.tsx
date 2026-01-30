
import React, { useState } from 'react';
import { ConnectionStatus } from '../types';

interface LoginPageProps {
  onConnect: (patientId: string, unitId: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onConnect }) => {
  const [patientId, setPatientId] = useState('');
  const [status, setStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!patientId.trim()) {
      alert("Please enter a Patient ID or PIN");
      return;
    }

    setIsSearching(true);
    setStatus(ConnectionStatus.SCANNING);

    // Mock Bluetooth Scan Logic
    setTimeout(() => {
      setStatus(ConnectionStatus.CONNECTED);
      setTimeout(() => {
        onConnect(patientId, 'Lateral-X Unit v1 (ESP32-B42)');
      }, 1000);
    }, 3000);
  };

  const getStatusColor = () => {
    switch (status) {
      case ConnectionStatus.DISCONNECTED: return 'text-red-500';
      case ConnectionStatus.SCANNING: return 'text-yellow-400';
      case ConnectionStatus.CONNECTED: return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative z-20">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-cyan-400 glow-text-cyan uppercase">
          Lateral-X
        </h1>
        <p className="text-xs font-tech text-cyan-700 tracking-[0.4em] mt-2">Next-Gen Exosuit Interface</p>
      </div>

      {/* Center Visual */}
      <div className="relative mb-12 flex items-center justify-center">
        <div className="absolute w-48 h-48 bg-cyan-500/10 rounded-full animate-pulse"></div>
        <div className="relative z-10 p-8 border-2 border-cyan-400/30 rounded-2xl bg-[#1a1a1a] shadow-2xl backdrop-blur-sm">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="80" 
            height="80" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-cyan-400"
          >
            <path d="M18 10h.01" />
            <path d="M12 2a3 3 0 1 0 3 3 3 3 0 0 0-3-3Z" />
            <path d="M7 10h.01" />
            <path d="M12 20v2" />
            <path d="M6 12v1a6 6 0 0 0 12 0v-1" />
            <path d="M12 9a4 4 0 0 1-4-4V4a4 4 0 0 1 8 0v1a4 4 0 0 1-4 4Z" />
          </svg>
        </div>
      </div>

      {/* Input Field */}
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-tech text-cyan-500 tracking-widest px-1">Identity Authorization</label>
          <input
            type="text"
            placeholder="PATIENT_ID / PIN_CODE"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            disabled={isSearching}
            className="w-full bg-[#0a0a0a] border border-cyan-900 focus:border-cyan-400 text-cyan-100 px-4 py-3 rounded-lg outline-none transition-all font-tech placeholder:text-cyan-900"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className={`w-full py-4 rounded-lg font-bold text-lg tracking-widest uppercase transition-all flex items-center justify-center space-x-3
            ${isSearching 
              ? 'bg-cyan-950 text-cyan-700 cursor-not-allowed border border-cyan-900' 
              : 'bg-cyan-500 text-[#0a0a0a] hover:bg-cyan-400 active:scale-95 glow-cyan shadow-[0_0_20px_rgba(34,211,238,0.2)]'
            }`}
        >
          {isSearching && (
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isSearching ? 'Synchronizing...' : 'Search for Exosuit'}
        </button>

        {/* Status Indicator */}
        <div className="text-center">
          <p className="text-[10px] text-slate-500 font-tech uppercase tracking-tighter mb-1">System Link Status</p>
          <p className={`font-tech text-sm font-bold ${getStatusColor()}`}>
            {status}
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-12 text-[10px] font-tech text-slate-700 flex flex-col items-center gap-1">
        <span>ENCRYPTED_AES_256_LINK</span>
        <span>LATERAL_X_OS_V4.2.0</span>
      </div>
    </div>
  );
};

export default LoginPage;
