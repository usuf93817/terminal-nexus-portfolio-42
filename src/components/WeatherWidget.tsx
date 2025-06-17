import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, Eye, Droplets, MapPin, Clock, Wifi, Key } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

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
  lat?: number;
  lon?: number;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiInput, setShowApiInput] = useState(false);
  const { toast } = useToast();

  const fetchLocationByGPS = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        },
        (error) => {
          reject(error);
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    });
  };

  const fetchWeatherData = async (lat: number, lon: number, key: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Weather API request failed');
      }
      
      const data = await response.json();
      
      return {
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        visibility: data.visibility ? Math.round(data.visibility / 1000) : 10,
        location: `${data.name}, ${data.sys.country}`,
        icon: data.weather[0].main.toLowerCase(),
        feelsLike: Math.round(data.main.feels_like),
        uvIndex: 0, // UV index requires separate API call
        pressure: data.main.pressure
      };
    } catch (error) {
      throw new Error('Failed to fetch weather data');
    }
  };

  const fetchLocationByIP = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      return {
        city: data.city,
        region: data.region,
        country: data.country_name,
        timezone: data.timezone,
        lat: data.latitude,
        lon: data.longitude
      };
    } catch (error) {
      console.log('IP location detection failed');
      return {
        city: 'San Francisco',
        region: 'CA',
        country: 'United States',
        timezone: 'America/Los_Angeles',
        lat: 37.7749,
        lon: -122.4194
      };
    }
  };

  const loadWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      let coords: { lat: number; lon: number };
      let locationData: LocationData;

      try {
        // Try GPS first
        coords = await fetchLocationByGPS();
        locationData = {
          city: 'Current Location',
          region: '',
          country: '',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          lat: coords.lat,
          lon: coords.lon
        };
        
        toast({
          title: "Location Access",
          description: "Using your precise GPS location for weather data",
        });
      } catch (gpsError) {
        // Fallback to IP location
        locationData = await fetchLocationByIP();
        coords = { lat: locationData.lat!, lon: locationData.lon! };
        
        toast({
          title: "Location Fallback",
          description: "Using IP-based location. Enable GPS for precise weather.",
        });
      }

      setLocation(locationData);

      if (apiKey) {
        const weatherData = await fetchWeatherData(coords.lat, coords.lon, apiKey);
        setWeather(weatherData);
        
        toast({
          title: "Weather Updated",
          description: `Current weather for ${weatherData.location}`,
        });
      } else {
        // Show mock data and prompt for API key
        const mockWeatherData: WeatherData = {
          temperature: 22,
          condition: "Partly Cloudy",
          humidity: 65,
          windSpeed: 12,
          visibility: 10,
          location: `${locationData.city}, ${locationData.region}`,
          icon: "partly-cloudy",
          feelsLike: 24,
          uvIndex: 6,
          pressure: 1013
        };
        setWeather(mockWeatherData);
        setShowApiInput(true);
      }
    } catch (err) {
      setError('Failed to load weather data');
      toast({
        title: "Weather Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Load initial data
    loadWeatherData();
    
    // Update every 10 minutes if API key is available
    const weatherInterval = setInterval(() => {
      if (apiKey) {
        loadWeatherData();
      }
    }, 600000);
    
    return () => {
      clearInterval(timeInterval);
      clearInterval(weatherInterval);
    };
  }, [apiKey]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setShowApiInput(false);
      loadWeatherData();
    }
  };

  const getWeatherIcon = (condition: string) => {
    const iconClass = "w-5 h-5";
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className={`${iconClass} text-yellow-400`} />;
      case 'cloudy':
      case 'partly cloudy':
      case 'clouds':
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
          {!apiKey && (
            <button
              onClick={() => setShowApiInput(!showApiInput)}
              className="text-terminal-text/60 hover:text-terminal-green transition-colors text-xs"
            >
              <Key className="w-3 h-3" />
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-terminal-text/60 hover:text-terminal-green transition-colors text-xs"
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>
      </div>

      {/* API Key Input */}
      {showApiInput && (
        <div className="p-3 border-b border-terminal-border/30 bg-terminal-bg/30">
          <form onSubmit={handleApiKeySubmit} className="space-y-2">
            <label className="text-xs text-terminal-text/60 font-mono">OpenWeatherMap API Key:</label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key for live data"
              className="w-full text-xs bg-terminal-bg border border-terminal-border/50 rounded px-2 py-1 text-terminal-text font-mono focus:border-terminal-green outline-none"
            />
            <button
              type="submit"
              className="w-full text-xs bg-terminal-green/20 text-terminal-green border border-terminal-green/30 rounded px-2 py-1 hover:bg-terminal-green/30 transition-colors"
            >
              Apply
            </button>
          </form>
          <p className="text-xs text-terminal-text/40 mt-1 font-mono">
            Get free API key at openweathermap.org
          </p>
        </div>
      )}

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
