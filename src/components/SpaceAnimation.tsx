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
      <div className="absolute inset-0 rounded-full bg-gray-900/50 backdrop-blur-sm"></div>
      
      {/* Star background */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div className="stars-bg absolute inset-0"></div>
      </div>
      
      {/* Central planet */}
      <Planet />
      
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
                color={satIndex % 3 === 0 ? "cyan" : satIndex % 3 === 1 ? "blue" : "yellow"}
                duration={plane.speed}
                size={plane.size}
                delay={startDelay}
                rotation={satelliteRotation}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SpaceAnimation;