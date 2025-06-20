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
    return <div className="fixed top-4 right-4 z-50">
        <div className="w-14 h-14 bg-terminal-bg/98 border-2 border-terminal-border rounded-xl backdrop-blur-md shadow-2xl flex items-center justify-center">
          <div className="animate-spin w-5 h-5 border-2 border-terminal-green/30 border-t-terminal-green rounded-full"></div>
        </div>
      </div>;
  }
  if (error || !weather) {
    return <div className="fixed top-4 right-4 z-50">
        <div className="w-14 h-14 bg-terminal-bg/98 border-2 border-red-500/70 rounded-xl backdrop-blur-md shadow-2xl flex items-center justify-center">
          <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
        </div>
      </div>;
  }
  return <div className="fixed top-4 right-4 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button aria-label="Weather information" className="group w-14 h-14 bg-terminal-bg/98 border-2 border-terminal-border rounded-xl backdrop-blur-md shadow-2xl transition-all duration-500 hover:border-terminal-green/80 hover:shadow-terminal-green/20 hover:shadow-2xl hover:scale-110 flex items-center justify-center relative overflow-hidden text-base">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-terminal-green/5 via-transparent to-terminal-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 my-0 mx-0" />
            
            <div className="flex items-center justify-center relative z-10">
              <div className="flex items-center space-x-1">
                <div className="transform transition-all duration-300 group-hover:scale-110">
                  {weatherIcon}
                </div>
                <span className="text-terminal-green text-sm font-mono font-bold transition-all duration-300 group-hover:text-terminal-text">
                  {weather.temperature}°
                </span>
              </div>
            </div>
            
            {/* Scan line effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-terminal-green/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 my-[12px]" />
          </button>
        </PopoverTrigger>
        
        <PopoverContent className="w-96 p-0 bg-terminal-bg/98 border-2 border-terminal-border backdrop-blur-xl shadow-2xl shadow-terminal-green/10 rounded-xl" align="end" sideOffset={12}>
          {/* Enhanced backdrop blur overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-terminal-bg/95 to-terminal-bg/90 rounded-xl backdrop-blur-xl" />
          
          <div className="relative z-10 p-6 space-y-5">
            {/* Header with enhanced styling */}
            <div className="flex items-center justify-between border-b border-terminal-border/60 pb-4">
              <span className="text-terminal-green text-lg font-mono font-semibold">weather.json</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
                <span className="text-terminal-text/80 text-sm font-mono">LIVE</span>
              </div>
            </div>

            {/* Primary Info with better contrast */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-terminal-green font-mono mb-2">
                  {weather.temperature}°C
                </div>
                <div className="text-terminal-text text-lg font-medium mb-2">
                  {weather.condition}
                </div>
                <div className="flex items-center text-terminal-text/70 text-sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{weather.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-20 h-20 bg-terminal-bg/60 rounded-xl border-2 border-terminal-border/40 backdrop-blur-sm">
                <div className="scale-[2]">
                  {weatherIcon}
                </div>
              </div>
            </div>

            {/* Time Display with enhanced visibility */}
            <div className="bg-terminal-bg/70 rounded-xl p-4 border-2 border-terminal-border/40 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-terminal-blue" />
                  <span className="text-terminal-text/80 text-base font-mono">Local Time</span>
                </div>
                <span className="text-terminal-green font-mono font-bold text-2xl">
                  {formattedTime}
                </span>
              </div>
            </div>

            {/* Weather Details with improved readability */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-terminal-bg/60 rounded-xl p-4 border-2 border-terminal-border/30 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <Droplets className="w-5 h-5 text-terminal-blue" />
                  <span className="text-terminal-text/80 text-sm font-medium">Humidity</span>
                </div>
                <div className="text-terminal-text font-mono text-2xl font-bold">
                  {weather.humidity}%
                </div>
              </div>

              <div className="bg-terminal-bg/60 rounded-xl p-4 border-2 border-terminal-border/30 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <Wind className="w-5 h-5 text-terminal-blue" />
                  <span className="text-terminal-text/80 text-sm font-medium">Wind</span>
                </div>
                <div className="text-terminal-text font-mono text-2xl font-bold">
                  {weather.windSpeed} km/h
                </div>
              </div>

              <div className="bg-terminal-bg/60 rounded-xl p-4 border-2 border-terminal-border/30 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <Eye className="w-5 h-5 text-terminal-blue" />
                  <span className="text-terminal-text/80 text-sm font-medium">Visibility</span>
                </div>
                <div className="text-terminal-text font-mono text-2xl font-bold">
                  {weather.visibility} km
                </div>
              </div>

              <div className="bg-terminal-bg/60 rounded-xl p-4 border-2 border-terminal-border/30 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-3">
                  <Thermometer className="w-5 h-5 text-terminal-blue" />
                  <span className="text-terminal-text/80 text-sm font-medium">Feels like</span>
                </div>
                <div className="text-terminal-text font-mono text-2xl font-bold">
                  {weather.feelsLike}°C
                </div>
              </div>
            </div>

            {/* Footer with enhanced styling */}
            <div className="flex items-center justify-between text-terminal-text/60 text-xs font-mono pt-4 border-t border-terminal-border/40">
              <span className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-terminal-green rounded-full animate-pulse"></div>
                <span>AUTO-LOCATION</span>
              </span>
              <span>UPDATED: NOW</span>
            </div>
          </div>
          
          {/* Enhanced glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-terminal-green/5 via-transparent to-terminal-blue/5 pointer-events-none" />
        </PopoverContent>
      </Popover>
    </div>;
});
WeatherWidget.displayName = 'WeatherWidget';
export default WeatherWidget;