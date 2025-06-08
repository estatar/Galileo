import React from 'react';

interface OrbitProps {
  color: 'cyan' | 'magenta' | 'yellow' | 'blue' | 'purple';
  duration: number;
  size: number; // percentage of container
  delay: number;
  rotation: number; // degrees
}

const colorMap = {
  cyan: 'bg-cyan-400',
  magenta: 'bg-fuchsia-500',
  yellow: 'bg-amber-400',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
};

const glowMap = {
  cyan: 'shadow-cyan-400/60',
  magenta: 'shadow-fuchsia-500/60',
  yellow: 'shadow-amber-400/60',
  blue: 'shadow-blue-500/60',
  purple: 'shadow-purple-500/60',
};

const trailMap = {
  cyan: 'from-cyan-400/40 to-transparent',
  magenta: 'from-fuchsia-500/40 to-transparent',
  yellow: 'from-amber-400/40 to-transparent',
  blue: 'from-blue-500/40 to-transparent',
  purple: 'from-purple-500/40 to-transparent',
};

const Orbit: React.FC<OrbitProps> = ({ color, duration, size, delay, rotation }) => {
  const orbitStyle = {
    width: `${size}%`,
    height: `${size}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    transform: `rotate(${rotation}deg)`,
  };

  return (
    <div 
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-700/30 orbit-path"
      style={orbitStyle}
    >
      {/* Orbital trail effect */}
      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${trailMap[color]} opacity-30 blur-sm`}></div>
      
      {/* Enhanced satellite with multiple layers */}
      <div className="absolute satellite-container">
        {/* Outer glow */}
        <div className={`absolute w-8 h-8 md:w-10 md:h-10 rounded-full ${colorMap[color]} opacity-20 blur-md animate-pulse`}></div>
        
        {/* Middle glow */}
        <div className={`absolute w-6 h-6 md:w-7 md:h-7 rounded-full ${colorMap[color]} opacity-40 blur-sm animate-pulse`} style={{ animationDelay: '0.5s' }}></div>
        
        {/* Core satellite */}
        <div className={`absolute w-3 h-3 md:w-4 md:h-4 rounded-full ${colorMap[color]} shadow-lg ${glowMap[color]} animate-pulse border border-white/20`}></div>
        
        {/* Signal transmission effect */}
        <div className={`absolute w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-${color}-400/20 animate-ping`} style={{ animationDuration: '3s' }}></div>
      </div>
    </div>
  );
};

export default Orbit;