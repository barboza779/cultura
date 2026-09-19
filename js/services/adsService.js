/**
 * PERIÓDICO CULTURA - SERVICIO DE PUBLICIDAD (ADS SERVICE)
 * Gestión de espacios publicitarios, estados y posiciones.
 */

import { StorageService } from './storageService.js';

export const AD_SLOTS = [
  { id: 'banner-top', name: 'Banner Superior (Cabecera)' },
  { id: 'sidebar-ad', name: 'Publicidad Lateral (Computadora)' },
  { id: 'in-feed-ad', name: 'Publicidad Entre Noticias' },
  { id: 'carousel-ad', name: 'Publicidad en Carrusel' },
  { id: 'banner-bottom', name: 'Banner Inferior (Pie)' }
];

export const AdsService = {
  getAll(includeInactive = false) {
    const all = StorageService.getAds();
    if (includeInactive) return all;
    return all.filter(ad => ad.isActive);
  },

  getBySlot(slot) {
    const active = this.getAll(false);
    return active.find(ad => ad.slot === slot) || null;
  },

  getById(id) {
    const all = StorageService.getAds();
    return all.find(ad => ad.id === id) || null;
  },

  save(adItem) {
    const all = StorageService.getAds();
    const isNew = !adItem.id;
    const finalItem = {
      ...adItem,
      id: adItem.id || `ad-${Date.now()}`,
      updatedAt: new Date().toISOString()
    };

    let updatedList;
    if (isNew) {
      finalItem.createdAt = new Date().toISOString();
      updatedList = [...all, finalItem];
    } else {
      updatedList = all.map(a => a.id === finalItem.id ? finalItem : a);
    }

    StorageService.saveAds(updatedList);
    return finalItem;
  },

  toggleStatus(id) {
    const all = StorageService.getAds();
    const item = all.find(a => a.id === id);
    if (!item) return false;

    item.isActive = !item.isActive;
    StorageService.saveAds(all);
    return item.isActive;
  },

  delete(id) {
    const all = StorageService.getAds();
    const filtered = all.filter(a => a.id !== id);
    StorageService.saveAds(filtered);
    return true;
  }
};
