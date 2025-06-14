
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, Eye, Droplets, MapPin, Clock } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  location: string;
  icon: string;
  feelsLike: number;
  uvIndex: number;
  pressure: number;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Enhanced mock weather data
  const mockWeatherData: WeatherData = {
    temperature: 22,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    location: "San Francisco, CA",
    icon: "partly-cloudy",
    feelsLike: 24,
    uvIndex: 6,
    pressure: 1013
  };

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Simulate API call
    const fetchWeather = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setWeather(mockWeatherData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Update every 10 minutes
    const weatherInterval = setInterval(fetchWeather, 600000);
    
    return () => {
      clearInterval(timeInterval);
      clearInterval(weatherInterval);
    };
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="w-6 h-6 text-yellow-400 drop-shadow-lg" />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className="w-6 h-6 text-gray-400 drop-shadow-lg" />;
      case 'rainy':
      case 'rain':
        return <CloudRain className="w-6 h-6 text-blue-400 drop-shadow-lg" />;
      case 'snowy':
      case 'snow':
        return <CloudSnow className="w-6 h-6 text-white drop-shadow-lg" />;
      default:
        return <Cloud className="w-6 h-6 text-gray-400 drop-shadow-lg" />;
    }
  };

  if (loading) {
    return (
      <div className="fixed top-4 right-4 w-64 bg-gradient-to-br from-terminal-bg/95 to-terminal-bg/80 border border-terminal-border/50 rounded-lg backdrop-blur-md overflow-hidden shadow-xl z-40">
        <div className="p-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin w-6 h-6 border-2 border-terminal-green border-t-transparent rounded-full"></div>
            <span className="ml-2 text-terminal-text font-mono text-sm">Syncing...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="fixed top-4 right-4 w-64 bg-gradient-to-br from-terminal-bg/95 to-terminal-bg/80 border border-red-500/50 rounded-lg backdrop-blur-md overflow-hidden shadow-xl z-40">
        <div className="p-4">
          <div className="text-red-400 font-mono text-sm flex items-center">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse" />
            Weather unavailable
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed top-4 right-4 bg-gradient-to-br from-terminal-bg/95 to-terminal-bg/80 border border-terminal-border/50 rounded-lg backdrop-blur-md overflow-hidden shadow-xl transition-all duration-300 z-40 ${
      isExpanded ? 'w-80' : 'w-64'
    }`}>
      {/* Compact Header */}
      <div className="relative px-3 py-2 bg-gradient-to-r from-terminal-green/10 to-terminal-blue/10 border-b border-terminal-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <span className="text-terminal-green text-xs font-mono font-semibold">weather.sys</span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-terminal-text/60 hover:text-terminal-green transition-colors"
          >
            <div className="w-3 h-3 border border-current rounded" />
          </button>
        </div>
      </div>

      {/* Compact Weather Display */}
      <div className="p-3 space-y-3">
        {/* Primary Weather Info */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-terminal-green font-mono flex items-baseline">
              {weather.temperature}
              <span className="text-sm text-terminal-text/60 ml-1">°C</span>
            </div>
            <div className="text-terminal-text/80 text-xs font-mono">
              {weather.condition}
            </div>
            <div className="flex items-center text-terminal-text/60 text-xs font-mono">
              <MapPin className="w-2 h-2 mr-1" />
              SF, CA
            </div>
          </div>
          <div className="relative">
            {getWeatherIcon(weather.condition)}
          </div>
        </div>

        {/* Compact Time Display */}
        <div className="bg-terminal-bg/30 rounded-md p-2 border border-terminal-border/20">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-terminal-blue" />
              <span className="text-terminal-text/80 font-mono">Time</span>
            </div>
            <div className="text-terminal-green font-mono font-bold">
              {currentTime.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>

        {/* Compact Weather Details Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gradient-to-br from-terminal-bg/40 to-terminal-bg/20 rounded-md p-2 border border-terminal-border/20">
            <div className="flex items-center space-x-1 mb-1">
              <Droplets className="w-3 h-3 text-terminal-blue" />
              <span className="text-terminal-text/80 text-xs font-mono">Humidity</span>
            </div>
            <div className="text-terminal-green font-mono font-bold text-sm">
              {weather.humidity}%
            </div>
          </div>

          <div className="bg-gradient-to-br from-terminal-bg/40 to-terminal-bg/20 rounded-md p-2 border border-terminal-border/20">
            <div className="flex items-center space-x-1 mb-1">
              <Wind className="w-3 h-3 text-terminal-blue" />
              <span className="text-terminal-text/80 text-xs font-mono">Wind</span>
            </div>
            <div className="text-terminal-green font-mono font-bold text-sm">
              {weather.windSpeed} km/h
            </div>
          </div>

          {isExpanded && (
            <>
              <div className="bg-gradient-to-br from-terminal-bg/40 to-terminal-bg/20 rounded-md p-2 border border-terminal-border/20">
                <div className="flex items-center space-x-1 mb-1">
                  <Eye className="w-3 h-3 text-terminal-blue" />
                  <span className="text-terminal-text/80 text-xs font-mono">Visibility</span>
                </div>
                <div className="text-terminal-green font-mono font-bold text-sm">
                  {weather.visibility} km
                </div>
              </div>

              <div className="bg-gradient-to-br from-terminal-bg/40 to-terminal-bg/20 rounded-md p-2 border border-terminal-border/20">
                <div className="flex items-center space-x-1 mb-1">
                  <Thermometer className="w-3 h-3 text-terminal-blue" />
                  <span className="text-terminal-text/80 text-xs font-mono">Feels like</span>
                </div>
                <div className="text-terminal-green font-mono font-bold text-sm">
                  {weather.feelsLike}°C
                </div>
              </div>
            </>
          )}
        </div>

        {/* Compact Status Bar */}
        <div className="flex items-center justify-between text-terminal-text/40 text-xs font-mono pt-2 border-t border-terminal-border/20">
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-terminal-green rounded-full animate-pulse" />
            <span>LIVE</span>
          </div>
          <span>{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
