import React from 'react';
import Planet from './Planet';
import Orbit from './Orbit';

const SpaceAnimation: React.FC = () => {
  // Create three orbital planes with 9 satellites each
  const orbitalPlanes = [
    { rotation: 15, baseDelay: 0 },
    { rotation: -25, baseDelay: -5 },
    { rotation: 35, baseDelay: -10 },
  ];

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
          {/* Create 9 satellites per plane */}
          {Array.from({ length: 9 }).map((_, satIndex) => (
            <Orbit 
              key={`${planeIndex}-${satIndex}`}
              color={satIndex % 3 === 0 ? "cyan" : satIndex % 3 === 1 ? "blue" : "yellow"}
              duration={30 + (satIndex * 2)} // Vary the orbital period
              size={65 + (planeIndex * 15)} // Different orbital radius for each plane
              delay={plane.baseDelay - (satIndex * 2)} // Stagger the satellites
              rotation={plane.rotation + (satIndex * (360 / 9))} // Distribute satellites evenly
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SpaceAnimation;