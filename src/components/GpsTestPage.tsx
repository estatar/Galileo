import React, { useState, useEffect } from 'react';
import { ArrowLeft, Satellite, MapPin, Signal, Zap, Clock, Target, Radar } from 'lucide-react';

interface GpsTestPageProps {
  onBackToOverview: () => void;
}

interface SatelliteData {
  id: string;
  name: string;
  elevation: number;
  azimuth: number;
  signalStrength: number;
  status: 'searching' | 'acquiring' | 'locked' | 'lost';
}

const GpsTestPage: React.FC<GpsTestPageProps> = ({ onBackToOverview }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [satellites, setSatellites] = useState<SatelliteData[]>([]);
  const [location, setLocation] = useState({ lat: 0, lng: 0, accuracy: 0 });
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'scanning' | 'connecting' | 'connected'>('idle');

  // Stuttgart coordinates
  const stuttgartCoords = { lat: 48.7758, lng: 9.1829 };

  // Simulated Galileo satellites
  const galileoSatellites = [
    { id: 'GSAT0101', name: 'Galileo-1' },
    { id: 'GSAT0102', name: 'Galileo-2' },
    { id: 'GSAT0103', name: 'Galileo-3' },
    { id: 'GSAT0104', name: 'Galileo-4' },
    { id: 'GSAT0201', name: 'Galileo-5' },
    { id: 'GSAT0202', name: 'Galileo-6' },
    { id: 'GSAT0203', name: 'Galileo-7' },
    { id: 'GSAT0204', name: 'Galileo-8' },
  ];

  const startScan = () => {
    setIsScanning(true);
    setConnectionStatus('scanning');
    setScanProgress(0);
    setSatellites([]);
    setLocation({ lat: 0, lng: 0, accuracy: 0 });
  };

  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + 2;
        
        // Add satellites progressively
        if (newProgress > 20 && newProgress <= 40) {
          setSatellites(prev => {
            const newSats = galileoSatellites.slice(0, Math.floor((newProgress - 20) / 5)).map(sat => ({
              ...sat,
              elevation: Math.random() * 80 + 10,
              azimuth: Math.random() * 360,
              signalStrength: Math.random() * 30 + 20,
              status: 'searching' as const
            }));
            return newSats;
          });
        }

        // Update satellite status
        if (newProgress > 40) {
          setSatellites(prev => prev.map(sat => ({
            ...sat,
            status: newProgress > 60 ? 'locked' : 'acquiring',
            signalStrength: Math.min(sat.signalStrength + Math.random() * 10, 50)
          })));
        }

        // Update location
        if (newProgress > 70) {
          setConnectionStatus('connecting');
          const accuracy = Math.max(50 - (newProgress - 70) * 2, 1);
          setLocation({
            lat: stuttgartCoords.lat + (Math.random() - 0.5) * 0.001,
            lng: stuttgartCoords.lng + (Math.random() - 0.5) * 0.001,
            accuracy
          });
        }

        if (newProgress >= 100) {
          setConnectionStatus('connected');
          setIsScanning(false);
          return 100;
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isScanning]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'searching': return 'text-yellow-400';
      case 'acquiring': return 'text-orange-400';
      case 'locked': return 'text-green-400';
      case 'lost': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'idle': return 'Bereit zum Scannen';
      case 'scanning': return 'Suche nach Galileo-Satelliten...';
      case 'connecting': return 'Verbindung wird hergestellt...';
      case 'connected': return 'Verbunden mit Galileo-Netzwerk';
    }
  };

  return (
    <div className="w-full max-w-6xl py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={onBackToOverview}
          className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Zurück zur Übersicht</span>
        </button>
      </div>

      {/* Title */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
          Galileo GPS Test
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Verbindung zu Galileo-Satelliten testen und Positionsdaten in Echtzeit abrufen
        </p>
      </div>

      {/* Main Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Scanner */}
        <div className="space-y-6">
          {/* Radar Display */}
          <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-cyan-400 flex items-center">
                <Radar className="w-6 h-6 mr-2" />
                Satelliten-Radar
              </h3>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                connectionStatus === 'connected' ? 'bg-green-900/50 text-green-400' :
                connectionStatus === 'connecting' ? 'bg-orange-900/50 text-orange-400' :
                connectionStatus === 'scanning' ? 'bg-blue-900/50 text-blue-400' :
                'bg-gray-900/50 text-gray-400'
              }`}>
                {getConnectionStatusText()}
              </div>
            </div>

            {/* Radar Circle */}
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-900/30 bg-gradient-radial from-cyan-950/20 to-transparent">
                {/* Radar sweep */}
                {isScanning && (
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent origin-left animate-spin" 
                         style={{ animationDuration: '2s' }}></div>
                  </div>
                )}
                
                {/* Grid lines */}
                <div className="absolute inset-0 rounded-full border border-cyan-900/20"></div>
                <div className="absolute inset-8 rounded-full border border-cyan-900/20"></div>
                <div className="absolute inset-16 rounded-full border border-cyan-900/20"></div>
                <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-900/20"></div>
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-cyan-900/20"></div>

                {/* Center point */}
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

                {/* Satellites */}
                {satellites.map((sat, index) => {
                  const angle = (sat.azimuth * Math.PI) / 180;
                  const distance = (90 - sat.elevation) * 1.5; // Convert elevation to distance from center
                  const x = Math.cos(angle) * distance;
                  const y = Math.sin(angle) * distance;
                  
                  return (
                    <div
                      key={sat.id}
                      className={`absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
                        sat.status === 'locked' ? 'bg-green-400 animate-pulse' :
                        sat.status === 'acquiring' ? 'bg-orange-400' :
                        'bg-yellow-400'
                      }`}
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`
                      }}
                      title={`${sat.name} - ${sat.status}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Scan Button */}
            <div className="text-center mt-6">
              <button
                onClick={startScan}
                disabled={isScanning}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  isScanning 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25'
                }`}
              >
                {isScanning ? 'Scannen läuft...' : 'Galileo-Scan starten'}
              </button>
            </div>

            {/* Progress Bar */}
            {isScanning && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Scan-Fortschritt</span>
                  <span>{Math.round(scanProgress)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Data */}
        <div className="space-y-6">
          {/* Location Info */}
          <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-cyan-400 flex items-center mb-4">
              <MapPin className="w-6 h-6 mr-2" />
              Standort: Stuttgart, Deutschland
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Breitengrad:</span>
                <span className="text-white font-mono">
                  {connectionStatus === 'connected' ? location.lat.toFixed(6) : '---'}°
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Längengrad:</span>
                <span className="text-white font-mono">
                  {connectionStatus === 'connected' ? location.lng.toFixed(6) : '---'}°
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Genauigkeit:</span>
                <span className="text-white font-mono">
                  {connectionStatus === 'connected' ? `±${location.accuracy.toFixed(1)}m` : '---'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Höhe ü. NN:</span>
                <span className="text-white font-mono">
                  {connectionStatus === 'connected' ? '245m' : '---'}
                </span>
              </div>
            </div>
          </div>

          {/* Satellite List */}
          <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-cyan-400 flex items-center mb-4">
              <Satellite className="w-6 h-6 mr-2" />
              Verfügbare Satelliten ({satellites.length})
            </h3>
            
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {satellites.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  Keine Satelliten gefunden. Starten Sie einen Scan.
                </div>
              ) : (
                satellites.map((sat) => (
                  <div key={sat.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div>
                      <div className="font-medium text-white">{sat.name}</div>
                      <div className="text-sm text-gray-400">{sat.id}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${getStatusColor(sat.status)}`}>
                        {sat.status.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {sat.signalStrength.toFixed(0)} dB
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
            <h3 className="text-xl font-bold text-cyan-400 flex items-center mb-4">
              <Signal className="w-6 h-6 mr-2" />
              System-Status
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">Zeit-Sync</div>
                <div className={`text-sm font-medium ${connectionStatus === 'connected' ? 'text-green-400' : 'text-gray-400'}`}>
                  {connectionStatus === 'connected' ? 'Synchron' : 'Warten...'}
                </div>
              </div>
              
              <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-sm text-gray-400">Präzision</div>
                <div className={`text-sm font-medium ${connectionStatus === 'connected' ? 'text-green-400' : 'text-gray-400'}`}>
                  {connectionStatus === 'connected' ? 'Hoch' : 'Unbekannt'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Info */}
      <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl p-8 border border-cyan-800/30">
        <Zap className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4 text-cyan-400 text-center">Galileo-Technologie im Test</h3>
        <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed text-center">
          Dieser Test simuliert die Verbindung zu Galileo-Satelliten und zeigt die Funktionsweise des europäischen 
          Satellitennavigationssystems. In der Realität würde Ihr Gerät Signale von mindestens 4 Satelliten empfangen, 
          um eine präzise 3D-Position zu berechnen. Galileo bietet eine Genauigkeit von unter einem Meter und ist 
          vollständig kompatibel mit anderen GNSS-Systemen wie GPS.
        </p>
      </div>
    </div>
  );
};

export default GpsTestPage;