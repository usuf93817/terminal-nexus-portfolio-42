
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
        return <Sun className="w-8 h-8 text-yellow-400 drop-shadow-lg" />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className="w-8 h-8 text-gray-400 drop-shadow-lg" />;
      case 'rainy':
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-400 drop-shadow-lg" />;
      case 'snowy':
      case 'snow':
        return <CloudSnow className="w-8 h-8 text-white drop-shadow-lg" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-400 drop-shadow-lg" />;
    }
  };

  if (loading) {
    return (
      <div className="fixed top-6 right-6 w-80 bg-gradient-to-br from-terminal-bg/95 to-terminal-bg/80 border border-terminal-border/50 rounded-xl backdrop-blur-md overflow-hidden shadow-2xl">
        <div className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-2 border-terminal-green border-t-transparent rounded-full"></div>
            <span className="ml-3 text-terminal-text font-mono">Syncing weather data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="fixed top-6 right-6 w-80 bg-gradient-to-br from-terminal-bg/95 to-terminal-bg/80 border border-red-500/50 rounded-xl backdrop-blur-md overflow-hidden shadow-2xl">
        <div className="p-6">
          <div className="text-red-400 font-mono text-sm flex items-center">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse" />
            {error || 'Weather data unavailable'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed top-6 right-6 bg-gradient-to-br from-terminal-bg/95 to-terminal-bg/80 border border-terminal-border/50 rounded-xl backdrop-blur-md overflow-hidden shadow-2xl transition-all duration-300 ${
      isExpanded ? 'w-96' : 'w-80'
    }`}>
      {/* Holographic Header */}
      <div className="relative px-4 py-3 bg-gradient-to-r from-terminal-green/10 to-terminal-blue/10 border-b border-terminal-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <span className="text-terminal-green text-xs font-mono font-semibold">weather.neural.sys</span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-terminal-text/60 hover:text-terminal-green transition-colors"
          >
            <div className="w-4 h-4 border border-current rounded" />
          </button>
        </div>
        
        {/* Scan Line Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-terminal-green/20 to-transparent translate-x-[-100%] animate-[slideRight_3s_ease-in-out_infinite]" />
      </div>

      {/* Main Weather Display */}
      <div className="p-6 space-y-6">
        {/* Primary Weather Info */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-3xl font-bold text-terminal-green font-mono flex items-baseline">
              {weather.temperature}
              <span className="text-lg text-terminal-text/60 ml-1">°C</span>
            </div>
            <div className="text-terminal-text/80 text-sm font-mono">
              {weather.condition}
            </div>
            <div className="flex items-center text-terminal-text/60 text-xs font-mono">
              <MapPin className="w-3 h-3 mr-1" />
              {weather.location}
            </div>
          </div>
          <div className="relative">
            <div className="animate-pulse">
              {getWeatherIcon(weather.condition)}
            </div>
            {/* Weather icon glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-blue-400/20 rounded-full blur-xl -z-10" />
          </div>
        </div>

        {/* Time Display */}
        <div className="bg-terminal-bg/30 rounded-lg p-3 border border-terminal-border/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-terminal-blue" />
              <span className="text-terminal-text/80 text-xs font-mono">Local Time</span>
            </div>
            <div className="text-terminal-green font-mono font-bold">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Weather Details Grid */}
        <div className={`grid gap-3 transition-all duration-300 ${isExpanded ? 'grid-cols-2' : 'grid-cols-2'}`}>
          <div className="bg-gradient-to-br from-terminal-bg/40 to-terminal-bg/20 rounded-lg p-3 border border-terminal-border/20 hover:border-terminal-green/30 transition-colors">
            <div className="flex items-center space-x-2 mb-1">
              <Droplets className="w-4 h-4 text-terminal-blue" />
              <span className="text-terminal-text/80 text-xs font-mono">Humidity</span>
            </div>
            <div className="text-terminal-green font-mono font-bold">
              {weather.humidity}%
            </div>
          </div>

          <div className="bg-gradient-to-br from-terminal-bg/40 to-terminal-bg/20 rounded-lg p-3 border border-terminal-border/20 hover:border-terminal-green/30 transition-colors">
            <div className="flex items-center space-x-2 mb-1">
              <Wind className="w-4 h-4 text-terminal-blue" />
              <span className="text-terminal-text/80 text-xs font-mono">Wind</span>
            </div>
            <div className="text-terminal-green font-mono font-bold">
              {weather.windSpeed} km/h
            </div>
          </div>

          <div className="bg-gradient-to-br from-terminal-bg/40 to-terminal-bg/20 rounded-lg p-3 border border-terminal-border/20 hover:border-terminal-green/30 transition-colors">
            <div className="flex items-center space-x-2 mb-1">
              <Eye className="w-4 h-4 text-terminal-blue" />
              <span className="text-terminal-text/80 text-xs font-mono">Visibility</span>
            </div>
            <div className="text-terminal-green font-mono font-bold">
              {weather.visibility} km
            </div>
          </div>

          <div className="bg-gradient-to-br from-terminal-bg/40 to-terminal-bg/20 rounded-lg p-3 border border-terminal-border/20 hover:border-terminal-green/30 transition-colors">
            <div className="flex items-center space-x-2 mb-1">
              <Thermometer className="w-4 h-4 text-terminal-blue" />
              <span className="text-terminal-text/80 text-xs font-mono">Feels like</span>
            </div>
            <div className="text-terminal-green font-mono font-bold">
              {weather.feelsLike}°C
            </div>
          </div>

          {isExpanded && (
            <>
              <div className="bg-gradient-to-br from-terminal-bg/40 to-terminal-bg/20 rounded-lg p-3 border border-terminal-border/20 hover:border-terminal-green/30 transition-colors">
                <div className="flex items-center space-x-2 mb-1">
                  <Sun className="w-4 h-4 text-yellow-400" />
                  <span className="text-terminal-text/80 text-xs font-mono">UV Index</span>
                </div>
                <div className="text-terminal-green font-mono font-bold">
                  {weather.uvIndex}/10
                </div>
              </div>

              <div className="bg-gradient-to-br from-terminal-bg/40 to-terminal-bg/20 rounded-lg p-3 border border-terminal-border/20 hover:border-terminal-green/30 transition-colors">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-4 h-4 border border-terminal-blue rounded-full" />
                  <span className="text-terminal-text/80 text-xs font-mono">Pressure</span>
                </div>
                <div className="text-terminal-green font-mono font-bold">
                  {weather.pressure} hPa
                </div>
              </div>
            </>
          )}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between text-terminal-text/40 text-xs font-mono pt-2 border-t border-terminal-border/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
            <span>LIVE</span>
          </div>
          <span>Last sync: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Ambient Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-terminal-green/5 via-transparent to-terminal-blue/5 pointer-events-none rounded-xl" />
    </div>
  );
};

export default WeatherWidget;
