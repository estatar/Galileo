import React from 'react';

const Planet: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-700 via-blue-500 to-blue-300 relative overflow-hidden">
        {/* Cloud/atmosphere effect */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.2),transparent_40%)]"></div>
        </div>
        
        {/* Subtle landmass patterns */}
        <div className="absolute inset-0">
          <div className="absolute w-[30%] h-[25%] top-[20%] left-[10%] bg-teal-700 rounded-full blur-sm"></div>
          <div className="absolute w-[40%] h-[30%] top-[60%] left-[55%] bg-teal-800 rounded-full blur-sm"></div>
          <div className="absolute w-[20%] h-[20%] top-[30%] left-[65%] bg-teal-700 rounded-full blur-sm"></div>
        </div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.4),transparent_60%)]"></div>
        
        {/* Subtle pulsing glow */}
        <div className="absolute inset-[-4px] rounded-full bg-blue-500/20 animate-pulse-slow"></div>
      </div>
    </div>
  );
};

export default Planet;