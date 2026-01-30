
import React, { useState } from 'react';
import { UserSession } from '../types';
import LiveDriftTab from './LiveDriftTab';
import AISentinelTab from './AISentinelTab';
import ControlsTab from './ControlsTab';

interface HomeScreenProps {
  session: UserSession;
  onDisconnect: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ session, onDisconnect }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Live Drift', icon: <MonitorIcon /> },
    { label: 'AI Sentinel', icon: <CpuIcon /> },
    { label: 'Override', icon: <SettingsIcon /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 0: return <LiveDriftTab />;
      case 1: return <AISentinelTab />;
      case 2: return <ControlsTab onDisconnect={onDisconnect} />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto bg-[#121212] shadow-2xl relative z-20 border-x border-slate-900">
      {/* Top Bar */}
      <header className="px-6 py-4 flex justify-between items-center border-b border-cyan-950/50 bg-[#121212]/80 backdrop-blur-md">
        <div>
          <h1 className="text-xl font-bold text-cyan-400 glow-text-cyan tracking-tighter uppercase">Lateral-X</h1>
          <p className="text-[9px] font-tech text-cyan-800 uppercase tracking-widest leading-none">Status: Encrypted_Link</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-tech text-green-500/80 uppercase">ESP32_ACTV</span>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="flex items-center justify-around bg-[#0a0a0a] border-t border-cyan-950/30 pb-6 pt-2 px-2">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(idx)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 w-1/3 py-2 ${
              activeTab === idx ? 'text-cyan-400' : 'text-slate-600'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all ${activeTab === idx ? 'bg-cyan-950/30 scale-110' : ''}`}>
              {tab.icon}
            </div>
            <span className="text-[10px] font-tech uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

const MonitorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
);

const CpuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></svg>
);

const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);

export default HomeScreen;
