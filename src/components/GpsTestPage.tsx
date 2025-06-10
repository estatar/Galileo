import React, { useState, useEffect } from 'react';
import { ArrowLeft, Satellite, MapPin, Signal, Zap, Clock, Target, Activity, Wifi } from 'lucide-react';

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

interface SignalWave {
  id: number;
  angle: number;
  strength: number;
  frequency: string;
  color: string;
}

const GpsTestPage: React.FC<GpsTestPageProps> = ({ onBackToOverview }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [satellites, setSatellites] = useState<SatelliteData[]>([]);
  const [location, setLocation] = useState({ lat: 0, lng: 0, accuracy: 0 });
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'scanning' | 'connecting' | 'connected'>('idle');
  const [signalWaves, setSignalWaves] = useState<SignalWave[]>([]);
  const [detectedSignals, setDetectedSignals] = useState<number>(0);

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
    setSignalWaves([]);
    setDetectedSignals(0);
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

  // Generate signal waves animation
  useEffect(() => {
    if (isScanning) {
      const waveInterval = setInterval(() => {
        setSignalWaves(prev => {
          const newWaves = [...prev];
          
          // Add new signal waves
          if (Math.random() > 0.4) {
            const frequencies = ['E1', 'E5a', 'E5b', 'E6'];
            const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b'];
            const freqIndex = Math.floor(Math.random() * frequencies.length);
            
            newWaves.push({
              id: Date.now() + Math.random(),
              angle: Math.random() * 360,
              strength: Math.random() * 100 + 50,
              frequency: frequencies[freqIndex],
              color: colors[freqIndex]
            });
          }
          
          // Remove old waves
          return newWaves.filter(wave => Date.now() - wave.id < 4000);
        });
        
        setDetectedSignals(prev => Math.min(prev + Math.floor(Math.random() * 3), 999));
      }, 300);

      return () => clearInterval(waveInterval);
    } else {
      setSignalWaves([]);
    }
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
      case 'scanning': return 'Analysiere Signalspektrum...';
      case 'connecting': return 'Trianguliere Position...';
      case 'connected': return 'Galileo-Verbindung aktiv';
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
          Galileo Signal-Analyzer
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Echtzeit-Analyse von Galileo-Satellitensignalen und Spektrum-Visualisierung
        </p>
      </div>

      {/* Main Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Signal Visualizer */}
        <div className="space-y-6">
          {/* Signal Spectrum Analyzer */}
          <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-cyan-400 flex items-center">
                <Activity className="w-6 h-6 mr-2" />
                Spektrum-Analyzer
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

            {/* Signal Visualization */}
            <div className="relative w-full h-80 bg-black/50 rounded-lg border border-gray-700 overflow-hidden">
              {/* Oscilloscope-style background */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 400 320">
                  {/* Grid */}
                  {Array.from({ length: 17 }).map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1="0"
                      y1={i * 20}
                      x2="400"
                      y2={i * 20}
                      stroke="#1f2937"
                      strokeWidth="0.5"
                      opacity={i % 4 === 0 ? "0.6" : "0.3"}
                    />
                  ))}
                  {Array.from({ length: 21 }).map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={i * 20}
                      y1="0"
                      x2={i * 20}
                      y2="320"
                      stroke="#1f2937"
                      strokeWidth="0.5"
                      opacity={i % 4 === 0 ? "0.6" : "0.3"}
                    />
                  ))}
                </svg>
              </div>

              {/* Signal Waves */}
              {isScanning && (
                <div className="absolute inset-0">
                  {/* Frequency spectrum bars */}
                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-full p-4">
                    {['E1', 'E5a', 'E5b', 'E6'].map((freq, index) => {
                      const height = satellites.length > index ? 
                        (satellites[index]?.signalStrength || 0) * 4 : 
                        Math.random() * 100 + 20;
                      const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b'];
                      
                      return (
                        <div key={freq} className="flex flex-col items-center">
                          <div 
                            className="w-12 bg-gradient-to-t from-current to-transparent rounded-t transition-all duration-500"
                            style={{ 
                              height: `${height}px`,
                              color: colors[index],
                              boxShadow: `0 0 20px ${colors[index]}40`
                            }}
                          ></div>
                          <div className="text-xs text-gray-400 mt-2">{freq}</div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Floating signal indicators */}
                  {signalWaves.map((wave) => {
                    const age = Date.now() - wave.id;
                    const opacity = Math.max(1 - age / 4000, 0);
                    const scale = 1 + (age / 4000) * 2;
                    
                    return (
                      <div
                        key={wave.id}
                        className="absolute rounded-full border-2 animate-ping"
                        style={{
                          left: `${20 + (wave.angle / 360) * 60}%`,
                          top: `${20 + Math.sin(wave.angle) * 30}%`,
                          width: `${20 * scale}px`,
                          height: `${20 * scale}px`,
                          borderColor: wave.color,
                          opacity: opacity,
                          boxShadow: `0 0 20px ${wave.color}60`
                        }}
                      >
                        <div 
                          className="absolute inset-2 rounded-full"
                          style={{ backgroundColor: wave.color, opacity: 0.3 }}
                        ></div>
                      </div>
                    );
                  })}

                  {/* Signal strength waveform */}
                  <div className="absolute top-4 left-4 right-4">
                    <svg className="w-full h-16" viewBox="0 0 360 64">
                      <path
                        d={`M 0 32 ${Array.from({ length: 72 }).map((_, i) => {
                          const x = i * 5;
                          const y = 32 + Math.sin((i + scanProgress) * 0.3) * 15 * (isScanning ? 1 : 0);
                          return `L ${x} ${y}`;
                        }).join(' ')}`}
                        stroke="#06b6d4"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.8"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Status overlay */}
              {!isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Wifi className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">Bereit für Signal-Analyse</p>
                  </div>
                </div>
              )}
            </div>

            {/* Control Panel */}
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={startScan}
                  disabled={isScanning}
                  className={`px-8 py-3 rounded-lg font-medium transition-all ${
                    isScanning 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25'
                  }`}
                >
                  {isScanning ? 'Analyse läuft...' : 'Signal-Analyse starten'}
                </button>

                <div className="text-right">
                  <div className="text-sm text-gray-400">Erkannte Signale</div>
                  <div className="text-2xl font-bold text-cyan-400 font-mono">
                    {detectedSignals.toString().padStart(3, '0')}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {isScanning && (
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Analyse-Fortschritt</span>
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
                  Keine Satelliten gefunden. Starten Sie eine Analyse.
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
        <h3 className="text-2xl font-bold mb-4 text-cyan-400 text-center">Spektrum-Analyse Technologie</h3>
        <p className="text-gray-300 max-w-4xl mx-auto leading-relaxed text-center">
          Diese Visualisierung zeigt die Echtzeit-Analyse des Galileo-Signalspektrums. Die verschiedenen 
          Frequenzbänder (E1, E5a, E5b, E6) werden kontinuierlich überwacht, um optimale Signalqualität 
          und Positionsgenauigkeit zu gewährleisten. Die Spektrum-Analyse ermöglicht es, Störungen zu 
          erkennen und die beste Satellitenkombination für präzise Navigation auszuwählen.
        </p>
      </div>
    </div>
  );
};

export default GpsTestPage;