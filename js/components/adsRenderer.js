/**
 * PERIÓDICO CULTURA - RENDERIZADOR DINÁMICO DE PUBLICIDAD
 * Gestiona la inyección de anuncios según su slot y estado de activación.
 */

import { AdsService } from '../services/adsService.js';

export const AdsRenderer = {
  init() {
    this.renderAllSlots();

    window.addEventListener('cultura:ads-updated', () => {
      this.renderAllSlots();
    });
  },

  renderAllSlots() {
    this.renderSlot('banner-top', '.ad-slot-banner-top');
    this.renderSlot('sidebar-ad', '.ad-slot-sidebar');
    this.renderSlot('in-feed-ad', '.ad-slot-in-feed');
    this.renderSlot('carousel-ad', '.ad-slot-carousel');
    this.renderSlot('banner-bottom', '.ad-slot-banner-bottom');
  },

  renderSlot(slotName, selector) {
    const container = document.querySelector(selector);
    if (!container) return;

    const ad = AdsService.getBySlot(slotName);

    if (!ad) {
      container.style.display = 'none';
      return;
    }

    container.style.display = '';

    if (ad.imageUrl) {
      container.innerHTML = `
        <span class="ad-label">Espacio Publicitario</span>
        <a href="${ad.linkUrl || '#'}" target="_blank" rel="noopener noreferrer" class="ad-link" title="${ad.title}">
          <img src="${ad.imageUrl}" alt="${ad.title}" class="ad-image" loading="lazy" />
        </a>
      `;
    } else {
      // Placeholder elegante no invasivo para venta publicitaria local
      container.innerHTML = `
        <span class="ad-label">Espacio Publicitario</span>
        <div class="ad-placeholder">
          <span style="font-size: 1.25rem;">📢</span>
          <div class="ad-placeholder-title">${ad.title || 'Espacio Publicitario Disponible'}</div>
          <div class="ad-placeholder-desc">${ad.description || 'Comuníquese con Periódico Cultura para anunciar su marca'}</div>
          <a href="${ad.linkUrl || 'mailto:redaccion@periodicocultura.com.ar'}" class="btn btn-outline btn-sm" style="margin-top: 0.35rem;">
            Anunciar aquí
          </a>
        </div>
      `;
    }
  }
};
