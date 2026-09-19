/**
 * PERIÓDICO CULTURA - COMPONENTE LECTOR DE NOTICIA COMPLETA (MODAL READER)
 * Utiliza el elemento nativo <dialog> con accesibilidad, botones de compartir y toast.
 */

import { NewsService } from '../services/newsService.js';

export const ModalReader = {
  dialogEl: null,

  init() {
    this.dialogEl = document.getElementById('article-reader-dialog');
    if (!this.dialogEl) return;

    // Botón cerrar
    const closeBtn = this.dialogEl.querySelector('.dialog-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Cerrar al clickear fuera (en el backdrop)
    this.dialogEl.addEventListener('click', (e) => {
      const rect = this.dialogEl.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        this.close();
      }
    });

    // Cerrar con Escape
    this.dialogEl.addEventListener('cancel', () => {
      document.body.style.overflow = '';
    });
  },

  open(newsId) {
    if (!this.dialogEl) this.init();
    const news = NewsService.getById(newsId);
    if (!news) return;

    // Incrementar vistas
    NewsService.incrementViews(newsId);

    const bodyContainer = this.dialogEl.querySelector('.dialog-body');
    if (!bodyContainer) return;

    const tagsHtml = (news.tags || [])
      .map(tag => `<span class="dialog-tag">#${tag}</span>`)
      .join('');

    const pageUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(`${news.title} - Periódico Cultura`);

    bodyContainer.innerHTML = `
      <div class="dialog-meta">
        <span class="badge-category">${news.category || 'GENERAL'}</span>
        <span class="dialog-date">📅 ${news.date} • 🕒 ${news.time || '12:00 hs'}</span>
      </div>

      <h1 class="dialog-title">${news.title}</h1>

      ${news.summary ? `<div class="dialog-lead">${news.summary}</div>` : ''}

      <div class="dialog-featured-media">
        <img src="${news.mainImage || 'assets/images/noticia-priar.jpg'}" alt="${news.title}" class="dialog-featured-img" />
        <div class="dialog-caption">Fotografía: Archivo Periódico Cultura - Curuzú Cuatiá</div>
      </div>

      <div class="dialog-author-box">
        <span>✍️ <strong>Por:</strong> ${news.author || 'Redacción Periódico Cultura'}</span>
        <span>👁️ ${news.views || 1} lecturas</span>
      </div>

      <div class="dialog-text-content">
        ${news.fullContent || `<p>${news.summary}</p>`}
      </div>

      ${tagsHtml ? `<div class="dialog-tags">${tagsHtml}</div>` : ''}

      <div class="share-bar">
        <span class="share-label">Compartir noticia:</span>
        <a href="https://api.whatsapp.com/send?text=${shareTitle}%20${pageUrl}" target="_blank" rel="noopener noreferrer" class="share-btn share-whatsapp">
          WhatsApp
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${pageUrl}" target="_blank" rel="noopener noreferrer" class="share-btn share-facebook">
          Facebook
        </a>
        <a href="https://twitter.com/intent/tweet?text=${shareTitle}&url=${pageUrl}" target="_blank" rel="noopener noreferrer" class="share-btn share-twitter">
          X (Twitter)
        </a>
        <button type="button" class="share-btn share-copy" id="btn-copy-article-link">
          📋 Copiar enlace
        </button>
      </div>
    `;

    // Vincular botón de copiar enlace
    const copyBtn = bodyContainer.querySelector('#btn-copy-article-link');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          this.showToast('¡Enlace copiado al portapapeles!');
        }
      });
    }

    document.body.style.overflow = 'hidden';
    this.dialogEl.showModal();
    bodyContainer.scrollTop = 0;
  },

  close() {
    if (!this.dialogEl) return;
    this.dialogEl.close();
    document.body.style.overflow = '';
  },

  showToast(message) {
    const existing = document.querySelector('.toast-notice');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notice';
    toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 300ms ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
};
