
import { LocationData } from '@/types/weather';

export const formatTime = (date: Date, location: LocationData | null) => {
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
