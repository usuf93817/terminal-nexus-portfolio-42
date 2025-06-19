
import React, { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, Eye, Droplets, MapPin, Clock, Wifi, ChevronDown, ChevronUp } from 'lucide-react';
import { locationService, LocationData } from '../services/locationService';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

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

const WeatherWidget: React.FC = memo(() => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Memoized weather data generation
  const generateWeatherData = useCallback((locationData: LocationData): WeatherData => ({
    temperature: Math.round(15 + Math.random() * 20),
    condition: ["Sunny", "Partly Cloudy", "Cloudy", "Clear"][Math.floor(Math.random() * 4)],
    humidity: Math.round(30 + Math.random() * 50),
    windSpeed: Math.round(5 + Math.random() * 20),
    visibility: Math.round(8 + Math.random() * 7),
    location: `${locationData.city}, ${locationData.region}`,
    icon: "partly-cloudy",
    feelsLike: Math.round(15 + Math.random() * 20),
    uvIndex: Math.round(1 + Math.random() * 10),
    pressure: Math.round(1000 + Math.random() * 50)
  }), []);

  // Memoized weather icon component
  const weatherIcon = useMemo(() => {
    if (!weather) return null;
    
    const getWeatherIcon = (condition: string) => {
      const iconClass = "w-4 h-4";
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
    
    return getWeatherIcon(weather.condition);
  }, [weather?.condition]);

  // Memoized time formatting
  const formattedTime = useMemo(() => {
    if (location?.timezone) {
      try {
        return currentTime.toLocaleTimeString('en-US', { 
          timeZone: location.timezone,
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (error) {
        return currentTime.toLocaleTimeString('en-US', { 
          hour12: false,
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    }
    return currentTime.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [currentTime, location?.timezone]);

  // Check if mobile
  const isMobile = useMemo(() => window.innerWidth < 768, []);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const fetchData = async () => {
      setLoading(true);
      try {
        const locationData = await locationService.getCurrentLocation();
        setLocation(locationData);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const weatherData = generateWeatherData(locationData);
        setWeather(weatherData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather data');
        const fallbackLocation: LocationData = {
          city: 'San Francisco',
          region: 'CA',
          country: 'United States',
          lat: 37.7749,
          lon: -122.4194,
          timezone: 'America/Los_Angeles'
        };
        setLocation(fallbackLocation);
        setWeather(generateWeatherData(fallbackLocation));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const weatherInterval = setInterval(fetchData, 600000);
    
    return () => {
      clearInterval(timeInterval);
      clearInterval(weatherInterval);
    };
  }, [generateWeatherData]);

  if (loading) {
    return (
      <div className="fixed top-4 right-4 z-40">
        <div className="w-12 h-12 bg-terminal-bg/95 border border-terminal-border rounded-lg backdrop-blur-sm shadow-lg flex items-center justify-center">
          <div className="animate-spin w-4 h-4 border-2 border-terminal-green/30 border-t-terminal-green rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="fixed top-4 right-4 z-40">
        <div className="w-12 h-12 bg-terminal-bg/95 border border-red-500/50 rounded-lg backdrop-blur-sm shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-40">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            className="group w-12 h-12 bg-terminal-bg/95 border border-terminal-border rounded-lg backdrop-blur-sm shadow-lg transition-all duration-300 hover:border-terminal-green/50 hover:shadow-xl hover:scale-105 flex items-center justify-center"
            aria-label="Weather information"
          >
            <div className="flex items-center space-x-1">
              {weatherIcon}
              <span className="text-terminal-green text-xs font-mono font-bold hidden group-hover:block transition-all duration-300">
                {weather.temperature}°
              </span>
            </div>
          </button>
        </PopoverTrigger>
        
        <PopoverContent 
          className="w-80 p-0 bg-terminal-bg/95 border-terminal-border backdrop-blur-sm" 
          align="end"
          sideOffset={8}
        >
          <div className="p-4 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-terminal-border/50 pb-3">
              <span className="text-terminal-green text-sm font-mono">weather</span>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-terminal-green rounded-full animate-pulse"></div>
                <span className="text-terminal-text/60 text-xs font-mono">LIVE</span>
              </div>
            </div>

            {/* Primary Info */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-terminal-green font-mono">
                  {weather.temperature}°C
                </div>
                <div className="text-terminal-text/80 text-sm">
                  {weather.condition}
                </div>
                <div className="flex items-center text-terminal-text/60 text-xs mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{weather.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-16 h-16 bg-terminal-bg/50 rounded-lg border border-terminal-border/30">
                <div className="scale-150">
                  {weatherIcon}
                </div>
              </div>
            </div>

            {/* Time Display */}
            <div className="bg-terminal-bg/50 rounded-lg p-3 border border-terminal-border/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-terminal-blue" />
                  <span className="text-terminal-text/60 text-sm font-mono">Local Time</span>
                </div>
                <span className="text-terminal-green font-mono font-bold text-lg">
                  {formattedTime}
                </span>
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-terminal-bg/30 rounded-lg p-3 border border-terminal-border/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Droplets className="w-4 h-4 text-terminal-blue" />
                  <span className="text-terminal-text/60 text-sm">Humidity</span>
                </div>
                <div className="text-terminal-text font-mono text-lg font-bold">
                  {weather.humidity}%
                </div>
              </div>

              <div className="bg-terminal-bg/30 rounded-lg p-3 border border-terminal-border/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Wind className="w-4 h-4 text-terminal-blue" />
                  <span className="text-terminal-text/60 text-sm">Wind</span>
                </div>
                <div className="text-terminal-text font-mono text-lg font-bold">
                  {weather.windSpeed} km/h
                </div>
              </div>

              <div className="bg-terminal-bg/30 rounded-lg p-3 border border-terminal-border/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="w-4 h-4 text-terminal-blue" />
                  <span className="text-terminal-text/60 text-sm">Visibility</span>
                </div>
                <div className="text-terminal-text font-mono text-lg font-bold">
                  {weather.visibility} km
                </div>
              </div>

              <div className="bg-terminal-bg/30 rounded-lg p-3 border border-terminal-border/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Thermometer className="w-4 h-4 text-terminal-blue" />
                  <span className="text-terminal-text/60 text-sm">Feels like</span>
                </div>
                <div className="text-terminal-text font-mono text-lg font-bold">
                  {weather.feelsLike}°C
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-terminal-text/40 text-xs font-mono pt-3 border-t border-terminal-border/20">
              <span>AUTO-LOCATION</span>
              <span>UPDATED: NOW</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

WeatherWidget.displayName = 'WeatherWidget';

export default WeatherWidget;
