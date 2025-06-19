
export interface LocationData {
  city: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  timezone: string;
}

export class LocationService {
  async getCurrentLocation(): Promise<LocationData> {
    // Try browser geolocation first
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            enableHighAccuracy: true
          });
        });

        // Use reverse geocoding to get location details
        return await this.reverseGeocode(position.coords.latitude, position.coords.longitude);
      } catch (error) {
        console.log('Geolocation failed, falling back to IP location');
      }
    }

    // Fallback to IP-based location
    return await this.getLocationByIP();
  }

  private async reverseGeocode(lat: number, lon: number): Promise<LocationData> {
    try {
      // Using OpenStreetMap Nominatim API (free, no key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
      );
      
      if (!response.ok) throw new Error('Reverse geocoding failed');
      
      const data = await response.json();
      const address = data.address || {};
      
      return {
        city: address.city || address.town || address.village || 'Unknown',
        region: address.state || address.province || '',
        country: address.country || 'Unknown',
        lat,
        lon,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    } catch (error) {
      // Fallback if reverse geocoding fails
      return {
        city: 'Unknown',
        region: '',
        country: 'Unknown',
        lat,
        lon,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    }
  }

  private async getLocationByIP(): Promise<LocationData> {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (!response.ok) throw new Error('IP location failed');
      
      const data = await response.json();
      return {
        city: data.city || 'Unknown',
        region: data.region || '',
        country: data.country_name || 'Unknown',
        lat: data.latitude || 0,
        lon: data.longitude || 0,
        timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    } catch (error) {
      // Final fallback
      return {
        city: 'San Francisco',
        region: 'CA',
        country: 'United States',
        lat: 37.7749,
        lon: -122.4194,
        timezone: 'America/Los_Angeles'
      };
    }
  }
}

export const locationService = new LocationService();
