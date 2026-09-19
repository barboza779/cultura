/**
 * PERIÓDICO CULTURA - WIDGET DE CLIMA PARA CURUZÚ CUATIÁ
 * Muestra datos meteorológicos con indicador de demostración o datos en vivo.
 */

import { WeatherService } from '../services/weatherService.js';

export const WeatherWidget = {
  containerEl: null,

  async init(containerSelector = '#weather-widget-container') {
    this.containerEl = document.querySelector(containerSelector);
    if (!this.containerEl) return;

    // Primero renderizar inmediatamente los datos de muestra
    const demoData = WeatherService.getDemoWeather();
    this.render(demoData);

    // Intentar consultar en segundo plano la API real
    const liveData = await WeatherService.fetchLiveWeather();
    this.render(liveData);
  },

  render(data) {
    if (!this.containerEl) return;

    this.containerEl.innerHTML = `
      <div class="weather-card">
        <div class="weather-header">
          <div class="weather-title-box">
            <h3>Clima en Curuzú Cuatiá</h3>
            <span class="weather-source-badge">${data.sourceLabel}</span>
          </div>
          <button type="button" class="weather-refresh-btn" id="btn-refresh-weather" title="Actualizar datos del tiempo">
            🔄
          </button>
        </div>

        <div class="weather-main">
          <div class="weather-temp-huge">
            ${data.temperature}<span>°C</span>
          </div>
          <div class="weather-condition">
            <span class="condition-text">${data.conditionText}</span>
            <span class="thermal-feel">Sensación térmica: <strong>${data.feelsLike}°C</strong></span>
          </div>
        </div>

        <div class="weather-details-grid">
          <div class="weather-stat">
            <span class="weather-stat-label">Máx / Mín</span>
            <span class="weather-stat-val">🔺 ${data.tempMax}° / 🔻 ${data.tempMin}°</span>
          </div>
          <div class="weather-stat">
            <span class="weather-stat-label">Humedad</span>
            <span class="weather-stat-val">💧 ${data.humidity}%</span>
          </div>
          <div class="weather-stat">
            <span class="weather-stat-label">Viento</span>
            <span class="weather-stat-val">💨 ${data.windSpeed} km/h (${data.windDirection})</span>
          </div>
          <div class="weather-stat">
            <span class="weather-stat-label">Actualización</span>
            <span class="weather-stat-val">🕒 ${data.lastUpdated}</span>
          </div>
        </div>
      </div>
    `;

    const refreshBtn = this.containerEl.querySelector('#btn-refresh-weather');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', async () => {
        refreshBtn.style.transform = 'rotate(360deg)';
        const fresh = await WeatherService.fetchLiveWeather();
        this.render(fresh);
      });
    }
  }
};
