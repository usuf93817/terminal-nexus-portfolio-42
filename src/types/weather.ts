
export interface WeatherData {
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

export interface LocationData {
  city: string;
  region: string;
  country: string;
  timezone: string;
  lat?: number;
  lon?: number;
}
