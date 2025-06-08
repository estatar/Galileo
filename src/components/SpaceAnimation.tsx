import React from 'react';
import Planet from './Planet';
import Orbit from './Orbit';

const SpaceAnimation: React.FC = () => {
  // Define three orbital planes with asymmetric distribution
  const orbitalPlanes = [
    { rotation: 15, size: 70, speed: 30 },    // First plane slightly tilted
    { rotation: 155, size: 85, speed: 32 },   // Second plane offset from perfect symmetry
    { rotation: 275, size: 100, speed: 28 },  // Third plane at an irregular angle
  ];

  // Number of satellites per plane
  const satellitesPerPlane = 9;

  return (
    <div className="relative w-full max-w-2xl aspect-square my-8 md:my-12">
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 blur-xl"></div>
      
      {/* Main container with enhanced backdrop */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900/80 via-gray-950/90 to-black/95 backdrop-blur-sm border border-cyan-500/20 shadow-2xl shadow-cyan-500/10"></div>
      
      {/* Enhanced star background with multiple layers */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="stars-bg absolute inset-0"></div>
        <div className="stars-bg-2 absolute inset-0"></div>
        <div className="nebula-effect absolute inset-0"></div>
      </div>
      
      {/* Orbital grid lines */}
      <div className="absolute inset-0 rounded-full">
        <div className="absolute inset-8 rounded-full border border-cyan-500/10"></div>
        <div className="absolute inset-16 rounded-full border border-blue-500/10"></div>
        <div className="absolute inset-24 rounded-full border border-purple-500/10"></div>
        
        {/* Cross lines */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
      </div>
      
      {/* Central planet with enhanced glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-400/20 blur-lg animate-pulse-slow"></div>
        <Planet />
      </div>
      
      {/* Orbital planes with satellites */}
      {orbitalPlanes.map((plane, planeIndex) => (
        <React.Fragment key={planeIndex}>
          {/* Create evenly distributed satellites per plane */}
          {Array.from({ length: satellitesPerPlane }).map((_, satIndex) => {
            // Calculate even distribution angle for each satellite
            const satelliteRotation = plane.rotation + (satIndex * (360 / satellitesPerPlane));
            // Stagger the starting positions within each plane
            const startDelay = -(satIndex * (plane.speed / satellitesPerPlane));
            
            return (
              <Orbit 
                key={`${planeIndex}-${satIndex}`}
                color={satIndex % 4 === 0 ? "cyan" : satIndex % 4 === 1 ? "blue" : satIndex % 4 === 2 ? "purple" : "yellow"}
                duration={plane.speed}
                size={plane.size}
                delay={startDelay}
                rotation={satelliteRotation}
              />
            );
          })}
        </React.Fragment>
      ))}
      
      {/* Central energy pulse effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full">
        <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping"></div>
        <div className="absolute inset-0 rounded-full bg-cyan-400/50 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SpaceAnimation;