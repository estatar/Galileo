import React from 'react';
import { Rocket, Satellite, Radio, Globe } from 'lucide-react';

const GalileoInfo: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mt-8 md:mt-16 space-y-8 mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
        Das Galileo-System
      </h2>
      
      <p className="text-lg text-center text-gray-300 leading-relaxed">
        Galileo ist das europäische globale Satellitennavigationssystem, das präzise Positionierungs- und Zeitdienste unter ziviler Kontrolle bietet.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <InfoCard 
          icon={<Satellite className="w-6 h-6 text-cyan-400" />}
          title="30 Satelliten"
          description="Das Galileo-System besteht aus 30 Satelliten in drei Umlaufbahnen, die einen vollständigen globalen Dienst gewährleisten."
        />
        
        <InfoCard 
          icon={<Globe className="w-6 h-6 text-cyan-400" />}
          title="Globale Abdeckung"
          description="Galileo bietet eine weltweite Abdeckung mit höherer Genauigkeit in nördlichen Breitengraden als GPS."
        />
        
        <InfoCard 
          icon={<Radio className="w-6 h-6 text-cyan-400" />}
          title="Präzise Signale"
          description="Mit einer Genauigkeit von unter einem Meter bietet Galileo eine der präzisesten Positionsbestimmungen weltweit."
        />
        
        <InfoCard 
          icon={<Rocket className="w-6 h-6 text-cyan-400" />}
          title="Europäische Innovation"
          description="Entwickelt von der Europäischen Weltraumorganisation (ESA) als unabhängige Alternative zu GPS und GLONASS."
        />
      </div>
    </div>
  );
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-cyan-900 transition-colors group">
      <div className="flex items-center mb-4">
        <div className="mr-3 p-2 rounded-full bg-gray-800 group-hover:bg-gray-800/80 transition-colors">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-gray-100">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default GalileoInfo;