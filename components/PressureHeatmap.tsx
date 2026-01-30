
import React from 'react';

interface PressureHeatmapProps {
  leftIntensity: number;
  rightIntensity: number;
}

const PressureHeatmap: React.FC<PressureHeatmapProps> = ({ leftIntensity, rightIntensity }) => {
  
  const getHeatColor = (val: number) => {
    // 0.0 -> Blue, 0.5 -> Yellow, 1.0 -> Red
    if (val < 0.3) return '#0044ff'; // Low
    if (val < 0.6) return '#22d3ee'; // Normal/Cyan
    if (val < 0.8) return '#eab308'; // Caution/Yellow
    return '#ef4444'; // Danger/Red
  };

  const Foot = ({ isLeft, intensity }: { isLeft: boolean, intensity: number }) => {
    // Slight randomization for "live" feel
    const heel = Math.max(0.1, Math.min(1, intensity * 0.9 + Math.random() * 0.1));
    const arch = Math.max(0.1, Math.min(1, intensity * 0.6 + Math.random() * 0.1));
    const ball = Math.max(0.1, Math.min(1, intensity * 1.1 + Math.random() * 0.1));
    const toe = Math.max(0.1, Math.min(1, intensity * 1.2 + Math.random() * 0.1));

    return (
      <div className={`relative w-32 h-64 ${isLeft ? 'rotate-[-5deg]' : 'rotate-[5deg]'}`}>
        {/* Foot Outline */}
        <svg viewBox="0 0 100 200" className="w-full h-full text-slate-900/50 drop-shadow-2xl">
          <path 
            d="M50,10 C30,10 15,25 15,60 C15,100 25,140 25,170 C25,190 35,195 50,195 C65,195 75,190 75,170 C75,140 85,100 85,60 C85,25 70,10 50,10 Z" 
            fill="currentColor"
            stroke="#164e63"
            strokeWidth="2"
          />
          
          {/* Heel Sensor */}
          <circle cx="50" cy="165" r="18" fill={getHeatColor(heel)} className="transition-colors duration-500 opacity-80" />
          <text x="50" y="170" fontSize="6" fill="white" textAnchor="middle" className="font-tech">HEEL</text>

          {/* Arch Sensor */}
          <circle cx="50" cy="115" r="14" fill={getHeatColor(arch)} className="transition-colors duration-500 opacity-60" />
          <text x="50" y="118" fontSize="6" fill="white" textAnchor="middle" className="font-tech">ARCH</text>

          {/* Ball Sensor */}
          <circle cx="50" cy="65" r="20" fill={getHeatColor(ball)} className="transition-colors duration-500 opacity-90" />
          <text x="50" y="70" fontSize="6" fill="white" textAnchor="middle" className="font-tech">BALL</text>

          {/* Toe Sensor */}
          <circle cx="50" cy="30" r="12" fill={getHeatColor(toe)} className="transition-colors duration-500 opacity-100" />
          <text x="50" y="34" fontSize="6" fill="white" textAnchor="middle" className="font-tech">TOE</text>
        </svg>
      </div>
    );
  };

  return (
    <div className="flex gap-12 justify-center items-center">
      <Foot isLeft={true} intensity={leftIntensity} />
      <Foot isLeft={false} intensity={rightIntensity} />
    </div>
  );
};

export default PressureHeatmap;
