
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
    const iconClass = "w-5 h-5";
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className={`${iconClass} text-yellow-400`} />;
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
      <div className="fixed top-4 right-4 w-48 bg-terminal-bg/95 border border-terminal-border rounded-lg backdrop-blur-sm shadow-lg z-40">
        <div className="p-3">
          <div className="flex items-center space-x-2">
            <div className="animate-spin w-4 h-4 border-2 border-terminal-green/30 border-t-terminal-green rounded-full"></div>
            <span className="text-terminal-text text-sm font-mono">Loading...</span>
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
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-terminal-text/60 hover:text-terminal-green transition-colors text-xs"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

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
            {getWeatherIcon(weather.condition)}
          </div>
        </div>

        {/* Time Display */}
        <div className="bg-terminal-bg/50 rounded p-2 border border-terminal-border/30">
          <div className="flex items-center justify-between text-xs">
            <span className="text-terminal-text/60 font-mono">Time</span>
            <span className="text-terminal-green font-mono font-bold">
              {formatTime(currentTime)}
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
            <div className="w-1 h-1 bg-terminal-green rounded-full"></div>
            <span>LIVE</span>
          </div>
          <span>SYNC</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
