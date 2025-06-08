import React from 'react';
import { ArrowLeft, Cpu, Radio, Shield, Zap, Satellite, Globe, Clock, Target } from 'lucide-react';

interface TechnologyPageProps {
  onBackToOverview: () => void;
}

const TechnologyPage: React.FC<TechnologyPageProps> = ({ onBackToOverview }) => {
  return (
    <div className="w-full max-w-4xl py-8 space-y-12">
      {/* Header with back button */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBackToOverview}
          className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Zurück zur Übersicht</span>
        </button>
      </div>

      {/* Main title */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
          Galileo Technologie
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Das fortschrittlichste Satellitennavigationssystem Europas basiert auf modernster Technologie 
          und innovativen Lösungen für präzise Positionsbestimmung.
        </p>
      </div>

      {/* Technology sections */}
      <div className="space-y-16">
        {/* Satellite Constellation */}
        <TechSection
          icon={<Satellite className="w-8 h-8 text-cyan-400" />}
          title="Satellitenkonstellation"
          description="Das Galileo-System besteht aus 30 Satelliten, die in drei Umlaufbahnen in einer Höhe von 23.222 km über der Erde kreisen."
          features={[
            "24 operative Satelliten + 6 Ersatzsatelliten",
            "Drei Umlaufbahnen mit je 8-10 Satelliten",
            "Inklination von 56° für optimale Abdeckung",
            "Umlaufzeit von 14 Stunden und 5 Minuten"
          ]}
        />

        {/* Signal Technology */}
        <TechSection
          icon={<Radio className="w-8 h-8 text-blue-400" />}
          title="Signaltechnologie"
          description="Galileo sendet Signale auf mehreren Frequenzbändern mit verschiedenen Diensten für unterschiedliche Anwendungen."
          features={[
            "E1-Band (1575,42 MHz) - Öffentlicher Dienst",
            "E5a-Band (1176,45 MHz) - Kommerzielle Dienste",
            "E5b-Band (1207,14 MHz) - Such- und Rettungsdienst",
            "E6-Band (1278,75 MHz) - Verschlüsselte Dienste"
          ]}
        />

        {/* Precision & Accuracy */}
        <TechSection
          icon={<Target className="w-8 h-8 text-purple-400" />}
          title="Präzision & Genauigkeit"
          description="Galileo bietet verschiedene Genauigkeitsstufen für unterschiedliche Anwendungsbereiche."
          features={[
            "Öffentlicher Dienst: < 1 Meter horizontal",
            "Kommerzieller Dienst: < 20 cm mit Korrekturdaten",
            "Hochpräzisionsdienst: < 10 cm für Profis",
            "Such- und Rettungsdienst: < 5 Meter"
          ]}
        />

        {/* Atomic Clocks */}
        <TechSection
          icon={<Clock className="w-8 h-8 text-amber-400" />}
          title="Atomuhren"
          description="Jeder Galileo-Satellit ist mit hochpräzisen Atomuhren ausgestattet, die für die Zeitgenauigkeit entscheidend sind."
          features={[
            "Wasserstoff-Maser Atomuhren (PHM)",
            "Rubidium Atomuhren (RAFS) als Backup",
            "Genauigkeit von 1 Nanosekunde",
            "Synchronisation mit UTC-Zeit"
          ]}
        />

        {/* Ground Infrastructure */}
        <TechSection
          icon={<Globe className="w-8 h-8 text-green-400" />}
          title="Bodeninfrastruktur"
          description="Ein weltweites Netzwerk von Bodenstationen überwacht und steuert das Galileo-System kontinuierlich."
          features={[
            "2 Galileo Control Center (GCC) in Europa",
            "30+ Galileo Sensor Stations weltweit",
            "9 Uplink Stations für Satellitenkommunikation",
            "Kontinuierliche Überwachung und Kalibrierung"
          ]}
        />

        {/* Security Features */}
        <TechSection
          icon={<Shield className="w-8 h-8 text-red-400" />}
          title="Sicherheitsfeatures"
          description="Galileo implementiert fortschrittliche Sicherheitsmechanismen zum Schutz vor Störungen und Manipulation."
          features={[
            "Verschlüsselte Signale für kritische Anwendungen",
            "Anti-Spoofing Technologie",
            "Störungsresistente Signalverarbeitung",
            "Authentifizierung der Navigationsnachrichten"
          ]}
        />
      </div>

      {/* Technical Specifications */}
      <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
        <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Technische Spezifikationen
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SpecCard title="Satellitenmasse" value="733 kg" />
          <SpecCard title="Solarpanel-Spannweite" value="18,7 m" />
          <SpecCard title="Sendeleistung" value="1.630 W" />
          <SpecCard title="Lebensdauer" value="12+ Jahre" />
          <SpecCard title="Bahnhöhe" value="23.222 km" />
          <SpecCard title="Signalstärke" value="-157 dBW" />
        </div>
      </div>

      {/* Innovation highlight */}
      <div className="text-center bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl p-8 border border-cyan-800/30">
        <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4 text-cyan-400">Innovation & Zukunft</h3>
        <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Galileo repräsentiert die Spitze der europäischen Raumfahrttechnologie und wird kontinuierlich 
          weiterentwickelt. Zukünftige Updates werden noch präzisere Dienste und neue Anwendungsmöglichkeiten 
          in Bereichen wie autonomes Fahren, Präzisionslandwirtschaft und Katastrophenschutz ermöglichen.
        </p>
      </div>
    </div>
  );
};

interface TechSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

const TechSection: React.FC<TechSectionProps> = ({ icon, title, description, features }) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex items-center mb-6">
        <div className="mr-4 p-3 rounded-full bg-gray-800">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-100">{title}</h2>
      </div>
      
      <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0"></div>
            <span className="text-gray-400 text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface SpecCardProps {
  title: string;
  value: string;
}

const SpecCard: React.FC<SpecCardProps> = ({ title, value }) => {
  return (
    <div className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <div className="text-2xl font-bold text-cyan-400 mb-2">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  );
};

export default TechnologyPage;