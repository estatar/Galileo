import React from 'react';

interface OrbitProps {
  color: 'cyan' | 'magenta' | 'yellow' | 'blue';
  duration: number;
  size: number; // percentage of container
  delay: number;
  rotation: number; // degrees
}

const colorMap = {
  cyan: 'bg-cyan-500',
  magenta: 'bg-fuchsia-500',
  yellow: 'bg-amber-400',
  blue: 'bg-blue-500',
};

const glowMap = {
  cyan: 'shadow-cyan-500/50',
  magenta: 'shadow-fuchsia-500/50',
  yellow: 'shadow-amber-400/50',
  blue: 'shadow-blue-500/50',
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
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-800 orbit-path"
      style={orbitStyle}
    >
      <div 
        className={`absolute h-3 w-3 md:h-4 md:w-4 rounded-full ${colorMap[color]} shadow-lg ${glowMap[color]} animate-pulse satellite`}
      ></div>
    </div>
  );
};

export default Orbit;