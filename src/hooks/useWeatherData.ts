
import { useState, useEffect } from 'react';
import { WeatherData, LocationData } from '@/types/weather';
import { fetchLocationByGPS, fetchWeatherData, fetchLocationByIP } from '@/services/weatherService';
import { useToast } from "@/hooks/use-toast";

export const useWeatherData = (apiKey: string) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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
    loadWeatherData();
    
    // Update every 10 minutes if API key is available
    const weatherInterval = setInterval(() => {
      if (apiKey) {
        loadWeatherData();
      }
    }, 600000);
    
    return () => {
      clearInterval(weatherInterval);
    };
  }, [apiKey]);

  return {
    weather,
    location,
    loading,
    error,
    loadWeatherData
  };
};
