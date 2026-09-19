/**
 * PERIÓDICO CULTURA - SERVICIO METEOROLÓGICO (WEATHER SERVICE)
 * Proporciona datos del clima para Curuzú Cuatiá, Corrientes.
 * Estructurado con datos de muestra claramente etiquetados y conexión lista
 * para API en vivo (Open-Meteo sin necesidad de API Key).
 */

const CURUZU_COORDS = {
  latitude: -29.7917,
  longitude: -58.0547,
  city: "Curuzú Cuatiá",
  province: "Corrientes"
};

// Datos de demostración claramente identificados
const DEMO_WEATHER_DATA = {
  isLive: false,
  sourceLabel: "Demostración técnica (Curuzú Cuatiá)",
  city: "Curuzú Cuatiá",
  temperature: 24,
  conditionText: "Parcialmente nublado",
  conditionCode: "partly-cloudy",
  feelsLike: 25,
  tempMax: 28,
  tempMin: 16,
  humidity: 62,
  windSpeed: 14, // km/h
  windDirection: "SE",
  lastUpdated: "Demostración predeterminada"
};

export const WeatherService = {
  // Retorna datos de muestra inmediatamente
  getDemoWeather() {
    return { ...DEMO_WEATHER_DATA };
  },

  // Intenta consultar la API meteorológica real para Curuzú Cuatiá
  async fetchLiveWeather() {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${CURUZU_COORDS.latitude}&longitude=${CURUZU_COORDS.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FArgentina%2FBuenos_Aires`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500); // 4.5s timeout

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      const current = data.current;
      const daily = data.daily;

      const conditionInfo = this.interpretWmoCode(current.weather_code, current.is_day);

      return {
        isLive: true,
        sourceLabel: "Datos en vivo (Open-Meteo)",
        city: "Curuzú Cuatiá",
        temperature: Math.round(current.temperature_2m),
        conditionText: conditionInfo.text,
        conditionCode: conditionInfo.code,
        feelsLike: Math.round(current.apparent_temperature),
        tempMax: Math.round(daily.temperature_2m_max[0]),
        tempMin: Math.round(daily.temperature_2m_min[0]),
        humidity: Math.round(current.relative_humidity_2m),
        windSpeed: Math.round(current.wind_speed_10m),
        windDirection: this.degreesToCompass(current.wind_direction_10m),
        lastUpdated: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
      };
    } catch (error) {
      console.info("Weather API no disponible o sin conexión a internet. Utilizando datos de demostración:", error.message);
      return {
        ...DEMO_WEATHER_DATA,
        sourceLabel: "Demostración técnica (Sin conexión a API)"
      };
    }
  },

  // Traducción de códigos estándar WMO
  interpretWmoCode(code, isDay = 1) {
    if (code === 0) return { text: isDay ? "Cielo despejado" : "Noche despejada", code: "clear" };
    if (code === 1 || code === 2) return { text: "Parcialmente nublado", code: "partly-cloudy" };
    if (code === 3) return { text: "Nublado", code: "cloudy" };
    if (code === 45 || code === 48) return { text: "Neblina", code: "fog" };
    if (code >= 51 && code <= 55) return { text: "Llovizna", code: "drizzle" };
    if (code >= 61 && code <= 65) return { text: "Lluvia", code: "rain" };
    if (code >= 80 && code <= 82) return { text: "Chubascos", code: "rain" };
    if (code >= 95) return { text: "Tormenta eléctrica", code: "thunderstorm" };
    return { text: "Tiempo templado", code: "normal" };
  },

  degreesToCompass(deg) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
    return directions[Math.round(deg / 45) % 8];
  }
};
