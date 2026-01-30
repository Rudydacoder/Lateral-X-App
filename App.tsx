
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import HomeScreen from './components/HomeScreen';
import { UserSession } from './types';

const App: React.FC = () => {
  const [session, setSession] = useState<UserSession | null>(null);

  const handleConnect = (patientId: string, unitId: string) => {
    setSession({
      patientId,
      isConnected: true,
      unitId,
    });
  };

  const handleDisconnect = () => {
    setSession(null);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-slate-200 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
        <div className="scanline"></div>
      </div>

      {session ? (
        <HomeScreen session={session} onDisconnect={handleDisconnect} />
      ) : (
        <LoginPage onConnect={handleConnect} />
      )}
    </div>
  );
};

export default App;
