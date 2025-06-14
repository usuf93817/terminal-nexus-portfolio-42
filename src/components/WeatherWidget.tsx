
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, Eye, Droplets, MapPin, Clock, Wifi } from 'lucide-react';

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

interface LocationData {
  city: string;
  region: string;
  country: string;
  timezone: string;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
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

  const fetchLocationByIP = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        city: data.city,
        region: data.region,
        country: data.country_name,
        timezone: data.timezone
      };
    } catch (error) {
      console.log('Location detection failed, using default');
      return {
        city: 'San Francisco',
        region: 'CA',
        country: 'United States',
        timezone: 'America/Los_Angeles'
      };
    }
  };

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Fetch location and weather
    const fetchData = async () => {
      setLoading(true);
      try {
        const locationData = await fetchLocationByIP();
        setLocation(locationData);
        
        // Simulate weather API call with location-based data
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const weatherWithLocation = {
          ...mockWeatherData,
          location: `${locationData.city}, ${locationData.region}`
        };
        
        setWeather(weatherWithLocation);
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Update every 10 minutes
    const weatherInterval = setInterval(fetchData, 600000);
    
    return () => {
      clearInterval(timeInterval);
      clearInterval(weatherInterval);
    };
  }, []);

  const getWeatherIcon = (condition: string) => {
    const iconClass = "w-6 h-6 drop-shadow-lg";
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className={`${iconClass} text-yellow-400 animate-pulse`} />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className={`${iconClass} text-gray-400`} />;
      case 'rainy':
      case 'rain':
        return <CloudRain className={`${iconClass} text-blue-400`} />;
      case 'snowy':
      case 'snow':
        return <CloudSnow className={`${iconClass} text-white`} />;
      default:
        return <Cloud className={`${iconClass} text-gray-400`} />;
    }
  };

  const formatTime = (date: Date) => {
    if (location?.timezone) {
      return date.toLocaleTimeString('en-US', { 
        timeZone: location.timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="fixed top-4 right-4 w-64 bg-gradient-to-br from-terminal-bg/95 to-terminal-bg/80 border border-terminal-border/50 rounded-xl backdrop-blur-md overflow-hidden shadow-2xl z-40">
        <div className="p-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <div className="animate-spin w-6 h-6 border-2 border-terminal-green/30 border-t-terminal-green rounded-full"></div>
              <Wifi className="w-3 h-3 text-terminal-green absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className="text-terminal-text font-mono text-sm">Detecting location...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="fixed top-4 right-4 w-64 bg-gradient-to-br from-terminal-bg/95 to-red-900/20 border border-red-500/50 rounded-xl backdrop-blur-md overflow-hidden shadow-2xl z-40">
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
    <div className={`fixed top-4 right-4 bg-gradient-to-br from-terminal-bg/95 via-terminal-bg/90 to-terminal-bg/80 border border-terminal-border/50 rounded-xl backdrop-blur-md overflow-hidden shadow-2xl transition-all duration-500 z-40 ${
      isExpanded ? 'w-80' : 'w-64'
    }`}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-terminal-green/20 via-terminal-blue/10 to-terminal-purple/20"></div>
        <div className="absolute top-2 right-2 w-16 h-16 bg-terminal-green/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-12 h-12 bg-terminal-blue/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header with Neon Effect */}
      <div className="relative px-3 py-2 bg-gradient-to-r from-terminal-green/20 via-terminal-blue/15 to-terminal-purple/20 border-b border-terminal-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse shadow-lg shadow-red-400/50"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse shadow-lg shadow-yellow-400/50" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" style={{ animationDelay: '1s' }}></div>
            </div>
            <span className="text-terminal-green text-xs font-mono font-semibold glow-text">weather.sys</span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-terminal-text/60 hover:text-terminal-green transition-all duration-300 hover:scale-110"
          >
            <div className="w-3 h-3 border border-current rounded hover:shadow-sm hover:shadow-terminal-green/50" />
          </button>
        </div>
      </div>

      {/* Enhanced Weather Display */}
      <div className="relative p-3 space-y-3">
        {/* Primary Weather Info with Glow Effects */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-terminal-green font-mono flex items-baseline">
              <span className="drop-shadow-lg">{weather.temperature}</span>
              <span className="text-sm text-terminal-text/60 ml-1">°C</span>
            </div>
            <div className="text-terminal-text/80 text-xs font-mono">
              {weather.condition}
            </div>
            <div className="flex items-center text-terminal-text/60 text-xs font-mono">
              <MapPin className="w-2 h-2 mr-1" />
              {weather.location}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-terminal-green/20 to-terminal-blue/20 rounded-full blur-xl"></div>
            <div className="relative">
              {getWeatherIcon(weather.condition)}
            </div>
          </div>
        </div>

        {/* Enhanced Time Display */}
        <div className="bg-gradient-to-r from-terminal-bg/40 to-terminal-bg/20 rounded-lg p-2 border border-terminal-border/20 shadow-inner">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 text-terminal-blue animate-pulse" />
              <span className="text-terminal-text/80 font-mono">Local Time</span>
            </div>
            <div className="text-terminal-green font-mono font-bold text-sm tracking-wider">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>

        {/* Enhanced Weather Details Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gradient-to-br from-terminal-bg/40 to-terminal-bg/20 rounded-lg p-2 border border-terminal-border/20 hover:border-terminal-green/30 transition-all duration-300 group">
            <div className="flex items-center space-x-1 mb-1">
              <Droplets className="w-3 h-3 text-terminal-blue group-hover:animate-bounce" />
              <span className="text-terminal-text/80 text-xs font-mono">Humidity</span>
            </div>
            <div className="text-terminal-green font-mono font-bold text-sm">
              {weather.humidity}%
            </div>
          </div>

          <div className="bg-gradient-to-br from-terminal-bg/40 to-terminal-bg/20 rounded-lg p-2 border border-terminal-border/20 hover:border-terminal-green/30 transition-all duration-300 group">
            <div className="flex items-center space-x-1 mb-1">
              <Wind className="w-3 h-3 text-terminal-blue group-hover:animate-spin" />
              <span className="text-terminal-text/80 text-xs font-mono">Wind</span>
            </div>
            <div className="text-terminal-green font-mono font-bold text-sm">
              {weather.windSpeed} km/h
            </div>
          </div>

          {isExpanded && (
            <>
              <div className="bg-gradient-to-br from-terminal-bg/40 to-terminal-bg/20 rounded-lg p-2 border border-terminal-border/20 hover:border-terminal-green/30 transition-all duration-300 group">
                <div className="flex items-center space-x-1 mb-1">
                  <Eye className="w-3 h-3 text-terminal-blue group-hover:scale-110 transition-transform" />
                  <span className="text-terminal-text/80 text-xs font-mono">Visibility</span>
                </div>
                <div className="text-terminal-green font-mono font-bold text-sm">
                  {weather.visibility} km
                </div>
              </div>

              <div className="bg-gradient-to-br from-terminal-bg/40 to-terminal-bg/20 rounded-lg p-2 border border-terminal-border/20 hover:border-terminal-green/30 transition-all duration-300 group">
                <div className="flex items-center space-x-1 mb-1">
                  <Thermometer className="w-3 h-3 text-terminal-blue group-hover:animate-pulse" />
                  <span className="text-terminal-text/80 text-xs font-mono">Feels like</span>
                </div>
                <div className="text-terminal-green font-mono font-bold text-sm">
                  {weather.feelsLike}°C
                </div>
              </div>
            </>
          )}
        </div>

        {/* Enhanced Status Bar */}
        <div className="flex items-center justify-between text-terminal-text/40 text-xs font-mono pt-2 border-t border-terminal-border/20">
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-terminal-green rounded-full animate-pulse shadow-sm shadow-terminal-green/50" />
            <span>LIVE</span>
          </div>
          <div className="flex items-center space-x-1">
            <Wifi className="w-2 h-2" />
            <span>SYNC</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
