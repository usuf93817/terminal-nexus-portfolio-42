
import React, { useState, useEffect } from 'react';
import { Wind, Thermometer, Eye, Droplets, MapPin, Clock } from 'lucide-react';
import { useWeatherData } from '@/hooks/useWeatherData';
import WeatherIcon from './WeatherIcon';
import ApiKeyInput from './ApiKeyInput';
import { formatTime } from '@/utils/timeUtils';

const WeatherWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiInput, setShowApiInput] = useState(false);
  
  const { weather, location, loading, error, loadWeatherData } = useWeatherData(apiKey);

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  useEffect(() => {
    if (!apiKey && weather) {
      setShowApiInput(true);
    }
  }, [apiKey, weather]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setShowApiInput(false);
      loadWeatherData();
    }
  };

  if (loading) {
    return (
      <div className="fixed top-4 right-4 w-48 bg-terminal-bg/95 border border-terminal-border rounded-lg backdrop-blur-sm shadow-lg z-40">
        <div className="p-3">
          <div className="flex items-center space-x-2">
            <div className="animate-spin w-4 h-4 border-2 border-terminal-green/30 border-t-terminal-green rounded-full"></div>
            <span className="text-terminal-text text-sm font-mono">Loading weather...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="fixed top-4 right-4 w-48 bg-terminal-bg/95 border border-red-500/50 rounded-lg backdrop-blur-sm shadow-lg z-40">
        <div className="p-3">
          <div className="text-red-400 text-sm font-mono flex items-center">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
            Weather unavailable
          </div>
          <button
            onClick={loadWeatherData}
            className="mt-2 text-xs text-terminal-green hover:text-terminal-blue transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed top-4 right-4 bg-terminal-bg/95 border border-terminal-border rounded-lg backdrop-blur-sm shadow-lg transition-all duration-300 z-40 ${
      isExpanded ? 'w-64' : 'w-48'
    }`}>
      {/* Simple Header */}
      <div className="px-3 py-2 border-b border-terminal-border/50 flex items-center justify-between">
        <span className="text-terminal-green text-xs font-mono">weather</span>
        <div className="flex items-center space-x-2">
          <ApiKeyInput
            apiKey={apiKey}
            setApiKey={setApiKey}
            showApiInput={showApiInput}
            setShowApiInput={setShowApiInput}
            onSubmit={handleApiKeySubmit}
          />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-terminal-text/60 hover:text-terminal-green transition-colors text-xs"
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>
      </div>

      {/* API Key Input */}
      <ApiKeyInput
        apiKey={apiKey}
        setApiKey={setApiKey}
        showApiInput={showApiInput}
        setShowApiInput={setShowApiInput}
        onSubmit={handleApiKeySubmit}
      />

      {/* Clean Weather Display */}
      <div className="p-3 space-y-3">
        {/* Primary Info */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-terminal-green font-mono">
              {weather.temperature}°C
            </div>
            <div className="text-terminal-text/80 text-xs">
              {weather.condition}
            </div>
            <div className="flex items-center text-terminal-text/60 text-xs mt-1">
              <MapPin className="w-2 h-2 mr-1" />
              {weather.location}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <WeatherIcon condition={weather.condition} />
          </div>
        </div>

        {!apiKey && (
          <div className="text-xs text-terminal-text/60 bg-terminal-bg/30 rounded p-2 border border-terminal-border/20">
            <div className="flex items-center space-x-1">
              <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
              <span>Mock data - Add API key for live weather</span>
            </div>
          </div>
        )}

        {/* Time Display */}
        <div className="bg-terminal-bg/50 rounded p-2 border border-terminal-border/30">
          <div className="flex items-center justify-between text-xs">
            <span className="text-terminal-text/60 font-mono">Time</span>
            <span className="text-terminal-green font-mono font-bold">
              {formatTime(currentTime, location)}
            </span>
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-terminal-bg/30 rounded p-2">
            <div className="flex items-center space-x-1 mb-1">
              <Droplets className="w-3 h-3 text-terminal-blue" />
              <span className="text-terminal-text/60">Humidity</span>
            </div>
            <div className="text-terminal-text font-mono">{weather.humidity}%</div>
          </div>

          <div className="bg-terminal-bg/30 rounded p-2">
            <div className="flex items-center space-x-1 mb-1">
              <Wind className="w-3 h-3 text-terminal-blue" />
              <span className="text-terminal-text/60">Wind</span>
            </div>
            <div className="text-terminal-text font-mono">{weather.windSpeed} km/h</div>
          </div>

          {isExpanded && (
            <>
              <div className="bg-terminal-bg/30 rounded p-2">
                <div className="flex items-center space-x-1 mb-1">
                  <Eye className="w-3 h-3 text-terminal-blue" />
                  <span className="text-terminal-text/60">Visibility</span>
                </div>
                <div className="text-terminal-text font-mono">{weather.visibility} km</div>
              </div>

              <div className="bg-terminal-bg/30 rounded p-2">
                <div className="flex items-center space-x-1 mb-1">
                  <Thermometer className="w-3 h-3 text-terminal-blue" />
                  <span className="text-terminal-text/60">Feels like</span>
                </div>
                <div className="text-terminal-text font-mono">{weather.feelsLike}°C</div>
              </div>
            </>
          )}
        </div>

        {/* Simple Status */}
        <div className="flex items-center justify-between text-terminal-text/40 text-xs font-mono pt-2 border-t border-terminal-border/20">
          <div className="flex items-center space-x-1">
            <div className={`w-1 h-1 rounded-full ${apiKey ? 'bg-terminal-green' : 'bg-orange-400'}`}></div>
            <span>{apiKey ? 'LIVE' : 'DEMO'}</span>
          </div>
          <button
            onClick={loadWeatherData}
            className="hover:text-terminal-green transition-colors"
          >
            SYNC
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
