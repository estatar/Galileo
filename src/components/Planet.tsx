import React from 'react';

const Planet: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
      {/* Outer atmospheric glow */}
      <div className="absolute inset-[-8px] rounded-full bg-gradient-to-br from-blue-400/30 via-cyan-400/20 to-blue-600/30 blur-lg animate-pulse-slow"></div>
      
      {/* Main planet body */}
      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-800 relative overflow-hidden shadow-2xl">
        {/* Enhanced atmosphere layers */}
        <div className="absolute inset-0 opacity-70">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.3),transparent_50%)]"></div>
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(100,200,255,0.2),transparent_60%)]"></div>
        </div>
        
        {/* Enhanced landmass patterns with more detail */}
        <div className="absolute inset-0">
          <div className="absolute w-[35%] h-[30%] top-[15%] left-[8%] bg-gradient-to-br from-teal-600 to-teal-800 rounded-full blur-sm opacity-80"></div>
          <div className="absolute w-[45%] h-[35%] top-[55%] left-[50%] bg-gradient-to-br from-teal-700 to-green-800 rounded-full blur-sm opacity-80"></div>
          <div className="absolute w-[25%] h-[25%] top-[25%] left-[60%] bg-gradient-to-br from-teal-600 to-teal-700 rounded-full blur-sm opacity-70"></div>
          <div className="absolute w-[20%] h-[15%] top-[70%] left-[15%] bg-gradient-to-br from-green-700 to-teal-800 rounded-full blur-sm opacity-60"></div>
        </div>
        
        {/* Cloud formations */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute w-[60%] h-[20%] top-[30%] left-[20%] bg-white rounded-full blur-md opacity-30 animate-drift-slow"></div>
          <div className="absolute w-[40%] h-[15%] top-[60%] left-[40%] bg-white rounded-full blur-md opacity-25 animate-drift-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Enhanced shine effect with multiple layers */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(100,200,255,0.3),transparent_40%)]"></div>
        
        {/* Terminator line (day/night boundary) */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_40%,rgba(0,0,0,0.3)_60%)]"></div>
        
        {/* City lights on dark side */}
        <div className="absolute inset-0">
          <div className="absolute w-1 h-1 top-[40%] left-[70%] bg-yellow-300 rounded-full blur-sm opacity-60 animate-twinkle"></div>
          <div className="absolute w-1 h-1 top-[60%] left-[75%] bg-yellow-300 rounded-full blur-sm opacity-50 animate-twinkle" style={{ animationDelay: '1s' }}></div>
          <div className="absolute w-1 h-1 top-[50%] left-[80%] bg-yellow-300 rounded-full blur-sm opacity-70 animate-twinkle" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Planet;