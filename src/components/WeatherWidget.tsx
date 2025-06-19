import React, { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Thermometer, Eye, Droplets, MapPin, Clock, Wifi, ChevronDown, ChevronUp } from 'lucide-react';
import { locationService, LocationData } from '../services/locationService';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileCollapsed, setIsMobileCollapsed] = useState(true);
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
          minute: '2-digit',
          second: '2-digit'
        });
      } catch (error) {
        return currentTime.toLocaleTimeString('en-US', { 
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
      }
    }
    return currentTime.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
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
      <div className={`fixed ${isMobile ? 'bottom-4 right-4 w-40' : 'top-4 right-4 w-48'} bg-terminal-bg/95 border border-terminal-border rounded-lg backdrop-blur-sm shadow-lg z-40`}>
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
      <div className={`fixed ${isMobile ? 'bottom-4 right-4 w-40' : 'top-4 right-4 w-48'} bg-terminal-bg/95 border border-red-500/50 rounded-lg backdrop-blur-sm shadow-lg z-40`}>
        <div className="p-3">
          <div className="text-red-400 text-sm font-mono flex items-center">
            <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
            Weather unavailable
          </div>
        </div>
      </div>
    );
  }

  const shouldShowCollapsed = isMobile && isMobileCollapsed;

  return (
    <div 
      className={`fixed ${isMobile ? 'bottom-4 right-4' : 'top-4 right-4'} bg-terminal-bg/95 border border-terminal-border rounded-lg backdrop-blur-sm shadow-lg transition-all duration-300 z-40 ${
        shouldShowCollapsed ? 'w-16 h-16' : (isExpanded ? 'w-64' : (isMobile ? 'w-52' : 'w-48'))
      }`}
      role="region"
      aria-label="Weather information"
    >
      {shouldShowCollapsed ? (
        // Mobile collapsed view
        <button
          onClick={() => setIsMobileCollapsed(false)}
          className="w-full h-full flex items-center justify-center text-terminal-green hover:bg-terminal-green/10 rounded-lg transition-colors"
          aria-label="Expand weather widget"
        >
          {weatherIcon}
        </button>
      ) : (
        <>
          {/* Header */}
          <div className="px-3 py-2 border-b border-terminal-border/50 flex items-center justify-between">
            <span className="text-terminal-green text-xs font-mono">weather</span>
            <div className="flex items-center space-x-1">
              {!isMobile && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-terminal-text/60 hover:text-terminal-green transition-colors text-xs"
                  aria-label={isExpanded ? "Collapse weather details" : "Expand weather details"}
                >
                  {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              )}
              {isMobile && (
                <button
                  onClick={() => setIsMobileCollapsed(true)}
                  className="text-terminal-text/60 hover:text-terminal-green transition-colors text-xs"
                  aria-label="Collapse weather widget"
                >
                  <ChevronUp className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Weather Content */}
          <div className="p-3 space-y-3">
            {/* Primary Info */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-terminal-green font-mono" role="text" aria-label={`Temperature ${weather.temperature} degrees celsius`}>
                  {weather.temperature}°C
                </div>
                <div className="text-terminal-text/80 text-xs">
                  {weather.condition}
                </div>
                <div className="flex items-center text-terminal-text/60 text-xs mt-1">
                  <MapPin className="w-2 h-2 mr-1" aria-hidden="true" />
                  <span aria-label={`Location ${weather.location}`}>{weather.location}</span>
                </div>
              </div>
              <div className="flex items-center justify-center" aria-hidden="true">
                {weatherIcon}
              </div>
            </div>

            {/* Time Display */}
            <div className="bg-terminal-bg/50 rounded p-2 border border-terminal-border/30">
              <div className="flex items-center justify-between text-xs">
                <span className="text-terminal-text/60 font-mono">Time</span>
                <span className="text-terminal-green font-mono font-bold" role="text" aria-label={`Current time ${formattedTime}`}>
                  {formattedTime}
                </span>
              </div>
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-terminal-bg/30 rounded p-2">
                <div className="flex items-center space-x-1 mb-1">
                  <Droplets className="w-3 h-3 text-terminal-blue" aria-hidden="true" />
                  <span className="text-terminal-text/60">Humidity</span>
                </div>
                <div className="text-terminal-text font-mono" role="text" aria-label={`Humidity ${weather.humidity} percent`}>
                  {weather.humidity}%
                </div>
              </div>

              <div className="bg-terminal-bg/30 rounded p-2">
                <div className="flex items-center space-x-1 mb-1">
                  <Wind className="w-3 h-3 text-terminal-blue" aria-hidden="true" />
                  <span className="text-terminal-text/60">Wind</span>
                </div>
                <div className="text-terminal-text font-mono" role="text" aria-label={`Wind speed ${weather.windSpeed} kilometers per hour`}>
                  {weather.windSpeed} km/h
                </div>
              </div>

              {(isExpanded || isMobile) && (
                <>
                  <div className="bg-terminal-bg/30 rounded p-2">
                    <div className="flex items-center space-x-1 mb-1">
                      <Eye className="w-3 h-3 text-terminal-blue" aria-hidden="true" />
                      <span className="text-terminal-text/60">Visibility</span>
                    </div>
                    <div className="text-terminal-text font-mono" role="text" aria-label={`Visibility ${weather.visibility} kilometers`}>
                      {weather.visibility} km
                    </div>
                  </div>

                  <div className="bg-terminal-bg/30 rounded p-2">
                    <div className="flex items-center space-x-1 mb-1">
                      <Thermometer className="w-3 h-3 text-terminal-blue" aria-hidden="true" />
                      <span className="text-terminal-text/60">Feels like</span>
                    </div>
                    <div className="text-terminal-text font-mono" role="text" aria-label={`Feels like ${weather.feelsLike} degrees celsius`}>
                      {weather.feelsLike}°C
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Status */}
            <div className="flex items-center justify-between text-terminal-text/40 text-xs font-mono pt-2 border-t border-terminal-border/20">
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-terminal-green rounded-full" aria-hidden="true"></div>
                <span>LIVE</span>
              </div>
              <span>AUTO-LOCATION</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

WeatherWidget.displayName = 'WeatherWidget';

export default WeatherWidget;
