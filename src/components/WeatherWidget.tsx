
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, Eye, Droplets } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  location: string;
  icon: string;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock weather data - in a real app, you'd use a weather API
  const mockWeatherData: WeatherData = {
    temperature: 22,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    location: "San Francisco, CA",
    icon: "partly-cloudy"
  };

  useEffect(() => {
    // Simulate API call
    const fetchWeather = async () => {
      setLoading(true);
      try {
        // In a real implementation, you'd call a weather API here
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
    const interval = setInterval(fetchWeather, 600000);
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'rainy':
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      case 'snowy':
      case 'snow':
        return <CloudSnow className="w-8 h-8 text-white" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="fixed bottom-6 right-6 w-80 bg-[#1e1e1e] border border-terminal-border rounded-lg p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin w-6 h-6 border-2 border-terminal-green border-t-transparent rounded-full"></div>
          <span className="ml-3 text-terminal-text font-mono">Loading weather...</span>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="fixed bottom-6 right-6 w-80 bg-[#1e1e1e] border border-terminal-border rounded-lg p-6">
        <div className="text-terminal-red font-mono text-sm">
          {error || 'Weather data unavailable'}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-[#1e1e1e] border border-terminal-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-2 bg-[#323233] border-b border-terminal-border">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <span className="text-terminal-text text-xs font-mono">weather.sys</span>
        </div>
      </div>

      {/* Main Weather Display */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-terminal-green font-mono">
              {weather.temperature}°C
            </div>
            <div className="text-terminal-text/80 text-sm font-mono">
              {weather.condition}
            </div>
          </div>
          <div className="animate-pulse">
            {getWeatherIcon(weather.condition)}
          </div>
        </div>

        <div className="text-terminal-text/60 text-xs font-mono mb-4">
          📍 {weather.location}
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#2d2d2d] rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Droplets className="w-4 h-4 text-terminal-blue" />
              <span className="text-terminal-text/80 text-xs font-mono">Humidity</span>
            </div>
            <div className="text-terminal-green font-mono font-bold">
              {weather.humidity}%
            </div>
          </div>

          <div className="bg-[#2d2d2d] rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Wind className="w-4 h-4 text-terminal-blue" />
              <span className="text-terminal-text/80 text-xs font-mono">Wind</span>
            </div>
            <div className="text-terminal-green font-mono font-bold">
              {weather.windSpeed} km/h
            </div>
          </div>

          <div className="bg-[#2d2d2d] rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Eye className="w-4 h-4 text-terminal-blue" />
              <span className="text-terminal-text/80 text-xs font-mono">Visibility</span>
            </div>
            <div className="text-terminal-green font-mono font-bold">
              {weather.visibility} km
            </div>
          </div>

          <div className="bg-[#2d2d2d] rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Thermometer className="w-4 h-4 text-terminal-blue" />
              <span className="text-terminal-text/80 text-xs font-mono">Feels like</span>
            </div>
            <div className="text-terminal-green font-mono font-bold">
              {weather.temperature + 2}°C
            </div>
          </div>
        </div>

        {/* Update Time */}
        <div className="mt-4 text-center text-terminal-text/40 text-xs font-mono">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
