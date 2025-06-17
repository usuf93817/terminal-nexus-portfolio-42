
import { WeatherData, LocationData } from '@/types/weather';

export const fetchLocationByGPS = (): Promise<{ lat: number; lon: number }> => {
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

export const fetchWeatherData = async (lat: number, lon: number, key: string): Promise<WeatherData> => {
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

export const fetchLocationByIP = async (): Promise<LocationData> => {
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
