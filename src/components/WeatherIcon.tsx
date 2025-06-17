
import React from 'react';
import { Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react';

interface WeatherIconProps {
  condition: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition }) => {
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

export default WeatherIcon;
