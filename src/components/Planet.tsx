import React from 'react';

const Planet: React.FC = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-blue-800 relative overflow-hidden shadow-2xl">
        {/* Ocean base with subtle variations */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-800"></div>
        
        {/* Continental landmasses - more realistic shapes and colors */}
        <div className="absolute inset-0">
          {/* North America / Europe region */}
          <div className="absolute w-[35%] h-[40%] top-[15%] left-[5%] bg-gradient-to-br from-green-600 to-amber-700 rounded-full blur-[1px] opacity-90 transform rotate-12"></div>
          <div className="absolute w-[25%] h-[30%] top-[20%] left-[15%] bg-gradient-to-br from-yellow-700 to-amber-800 rounded-full blur-[1px] opacity-80 transform rotate-45"></div>
          
          {/* Africa / Middle East */}
          <div className="absolute w-[20%] h-[45%] top-[25%] left-[45%] bg-gradient-to-br from-yellow-600 to-orange-700 rounded-full blur-[1px] opacity-85 transform rotate-12"></div>
          
          {/* Asia */}
          <div className="absolute w-[40%] h-[35%] top-[10%] left-[60%] bg-gradient-to-br from-green-700 to-yellow-700 rounded-full blur-[1px] opacity-80 transform -rotate-12"></div>
          
          {/* South America */}
          <div className="absolute w-[18%] h-[35%] top-[45%] left-[25%] bg-gradient-to-br from-green-600 to-amber-700 rounded-full blur-[1px] opacity-85 transform rotate-6"></div>
          
          {/* Australia */}
          <div className="absolute w-[15%] h-[20%] top-[55%] left-[70%] bg-gradient-to-br from-orange-600 to-red-700 rounded-full blur-[1px] opacity-80"></div>
          
          {/* Additional smaller landmasses */}
          <div className="absolute w-[12%] h-[15%] top-[35%] left-[80%] bg-gradient-to-br from-green-700 to-yellow-600 rounded-full blur-[1px] opacity-75"></div>
          <div className="absolute w-[8%] h-[12%] top-[65%] left-[15%] bg-gradient-to-br from-green-600 to-amber-600 rounded-full blur-[1px] opacity-70"></div>
        </div>
        
        {/* Cloud layer - more realistic cloud patterns */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute w-[60%] h-[25%] top-[20%] left-[10%] bg-white rounded-full blur-sm opacity-60 transform rotate-12"></div>
          <div className="absolute w-[45%] h-[20%] top-[45%] left-[40%] bg-white rounded-full blur-sm opacity-50 transform -rotate-6"></div>
          <div className="absolute w-[35%] h-[18%] top-[65%] left-[20%] bg-white rounded-full blur-sm opacity-55 transform rotate-18"></div>
          <div className="absolute w-[40%] h-[22%] top-[10%] left-[55%] bg-white rounded-full blur-sm opacity-45 transform -rotate-15"></div>
          <div className="absolute w-[25%] h-[15%] top-[35%] left-[70%] bg-white rounded-full blur-sm opacity-50"></div>
        </div>
        
        {/* Atmospheric glow and lighting */}
        <div className="absolute inset-0">
          {/* Day/night terminator effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-900/30"></div>
          
          {/* Sunlight reflection */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.3),transparent_50%)]"></div>
          
          {/* Atmospheric rim lighting */}
          <div className="absolute inset-[-2px] rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-400/10 to-transparent"></div>
        </div>
        
        {/* Subtle rotation animation for realism */}
        <div className="absolute inset-0 animate-spin-slow opacity-20">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
        
        {/* Outer atmospheric glow */}
        <div className="absolute inset-[-6px] rounded-full bg-blue-400/15 animate-pulse-slow"></div>
        <div className="absolute inset-[-8px] rounded-full bg-cyan-300/10 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default Planet;