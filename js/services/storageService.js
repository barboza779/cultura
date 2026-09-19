/**
 * PERIÓDICO CULTURA - SERVICIO DE ALMACENAMIENTO (STORAGE SERVICE)
 * Maneja persistencia en localStorage con fallback a datos predeterminados.
 * Totalmente preparado para ser reemplazado por llamadas a API REST / Base de Datos.
 */

import { INITIAL_NEWS, INITIAL_ADS, INITIAL_CAROUSEL, INITIAL_SETTINGS } from '../data/initialData.js';

const STORAGE_KEYS = {
  NEWS: 'periodico_cultura_news',
  ADS: 'periodico_cultura_ads',
  CAROUSEL: 'periodico_cultura_carousel',
  SETTINGS: 'periodico_cultura_settings'
};

export const StorageService = {
  // Inicialización o carga
  getNews() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.NEWS);
      if (!data) {
        this.saveNews(INITIAL_NEWS);
        return INITIAL_NEWS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn("Storage error, using INITIAL_NEWS:", e);
      return INITIAL_NEWS;
    }
  },

  saveNews(newsArray) {
    try {
      localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(newsArray));
      window.dispatchEvent(new CustomEvent('cultura:news-updated', { detail: newsArray }));
    } catch (e) {
      console.error("Error saving news to storage:", e);
    }
  },

  getAds() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ADS);
      if (!data) {
        this.saveAds(INITIAL_ADS);
        return INITIAL_ADS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn("Storage error, using INITIAL_ADS:", e);
      return INITIAL_ADS;
    }
  },

  saveAds(adsArray) {
    try {
      localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(adsArray));
      window.dispatchEvent(new CustomEvent('cultura:ads-updated', { detail: adsArray }));
    } catch (e) {
      console.error("Error saving ads to storage:", e);
    }
  },

  getCarousel() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CAROUSEL);
      if (!data) {
        this.saveCarousel(INITIAL_CAROUSEL);
        return INITIAL_CAROUSEL;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn("Storage error, using INITIAL_CAROUSEL:", e);
      return INITIAL_CAROUSEL;
    }
  },

  saveCarousel(carouselArray) {
    try {
      localStorage.setItem(STORAGE_KEYS.CAROUSEL, JSON.stringify(carouselArray));
      window.dispatchEvent(new CustomEvent('cultura:carousel-updated', { detail: carouselArray }));
    } catch (e) {
      console.error("Error saving carousel to storage:", e);
    }
  },

  getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) {
        this.saveSettings(INITIAL_SETTINGS);
        return INITIAL_SETTINGS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn("Storage error, using INITIAL_SETTINGS:", e);
      return INITIAL_SETTINGS;
    }
  },

  saveSettings(settingsObj) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settingsObj));
      window.dispatchEvent(new CustomEvent('cultura:settings-updated', { detail: settingsObj }));
    } catch (e) {
      console.error("Error saving settings to storage:", e);
    }
  },

  // Restaurar todo a valores iniciales de fábrica
  resetAll() {
    localStorage.removeItem(STORAGE_KEYS.NEWS);
    localStorage.removeItem(STORAGE_KEYS.ADS);
    localStorage.removeItem(STORAGE_KEYS.CAROUSEL);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    this.saveNews(INITIAL_NEWS);
    this.saveAds(INITIAL_ADS);
    this.saveCarousel(INITIAL_CAROUSEL);
    this.saveSettings(INITIAL_SETTINGS);
  }
};
