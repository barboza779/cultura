/**
 * PERIÓDICO CULTURA - COMPONENTE DE CARRUSEL TÁCTIL Y RESPONSIVE
 * Soporta navegación por botones, gestos táctiles (swipe), arrastre con mouse y autoplay.
 */

import { StorageService } from '../services/storageService.js';
import { ModalReader } from './modalReader.js';

export class NewsCarousel {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.track = this.container.querySelector('.carousel-track');
    this.prevBtn = this.container.querySelector('.carousel-btn.prev');
    this.nextBtn = this.container.querySelector('.carousel-btn.next');
    this.dotsContainer = this.container.querySelector('.carousel-dots');

    this.currentIndex = 0;
    this.slides = [];
    this.itemsPerView = this.getVisibleCount();
    this.autoPlayInterval = null;
    this.isAutoPlayActive = true;

    // Variables para gestos táctiles y mouse drag
    this.startX = 0;
    this.currentTranslate = 0;
    this.prevTranslate = 0;
    this.isDragging = false;
    this.dragThreshold = 45; // px

    this.init();
  }

  init() {
    this.renderSlides();
    this.bindEvents();
    this.startAutoPlay();

    // Escuchar actualizaciones desde el panel de control
    window.addEventListener('cultura:carousel-updated', () => {
      this.renderSlides();
    });

    window.addEventListener('resize', () => {
      const newCount = this.getVisibleCount();
      if (newCount !== this.itemsPerView) {
        this.itemsPerView = newCount;
        this.updatePosition();
      }
    });
  }

  getVisibleCount() {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 600) return 2;
    return 1;
  }

  renderSlides() {
    const items = StorageService.getCarousel().filter(item => item.isActive);
    if (!this.track) return;

    if (items.length === 0) {
      this.track.innerHTML = `<div style="padding: 2rem; text-align: center; width: 100%; color: var(--color-gray-500);">No hay publicaciones en el carrusel en este momento.</div>`;
      if (this.dotsContainer) this.dotsContainer.innerHTML = '';
      return;
    }

    this.items = items;
    this.track.innerHTML = items.map((item, index) => `
      <article class="carousel-slide" data-index="${index}" data-news-id="${item.newsId || ''}" style="cursor: pointer;">
        <div class="slide-img-wrapper">
          <img src="${item.imageUrl || 'assets/images/noticia-priar.jpg'}" alt="${item.title}" class="slide-img" loading="lazy" />
        </div>
        <div class="slide-content">
          <div class="slide-category">
            <span class="badge-category">${item.category || 'NOTICIA'}</span>
          </div>
          <h4 class="slide-title">${item.title}</h4>
          <span class="slide-date">📅 ${item.date || ''}</span>
        </div>
      </article>
    `).join('');

    this.slides = Array.from(this.track.querySelectorAll('.carousel-slide'));
    this.renderDots();
    this.updatePosition();
  }

  renderDots() {
    if (!this.dotsContainer) return;
    const maxIndex = Math.max(0, this.items.length - this.itemsPerView);
    this.dotsContainer.innerHTML = '';

    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === this.currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Ir a diapositiva ${i + 1}`);
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prev();
        this.resetAutoPlay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.next();
        this.resetAutoPlay();
      });
    }

    // Clicks en las tarjetas para abrir la noticia
    this.track.addEventListener('click', (e) => {
      const slide = e.target.closest('.carousel-slide');
      if (slide) {
        const newsId = slide.getAttribute('data-news-id');
        if (newsId) {
          ModalReader.open(newsId);
        }
      }
    });

    // Pausar autoplay al hacer hover
    this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.container.addEventListener('mouseleave', () => this.startAutoPlay());

    // Soporte táctil (Touch Events)
    this.track.addEventListener('touchstart', (e) => this.touchStart(e), { passive: true });
    this.track.addEventListener('touchmove', (e) => this.touchMove(e), { passive: true });
    this.track.addEventListener('touchend', () => this.touchEnd());

    // Soporte para arrastre con ratón (Mouse Drag)
    this.track.addEventListener('mousedown', (e) => this.dragStart(e));
    window.addEventListener('mousemove', (e) => this.dragMove(e));
    window.addEventListener('mouseup', () => this.dragEnd());
  }

  touchStart(e) {
    this.startX = e.touches[0].clientX;
    this.isDragging = true;
    this.stopAutoPlay();
  }

  touchMove(e) {
    if (!this.isDragging) return;
    const currentX = e.touches[0].clientX;
    this.currentTranslate = currentX - this.startX;
  }

  touchEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    if (this.currentTranslate < -this.dragThreshold) {
      this.next();
    } else if (this.currentTranslate > this.dragThreshold) {
      this.prev();
    }
    this.currentTranslate = 0;
    this.startAutoPlay();
  }

  dragStart(e) {
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
    this.startX = e.clientX;
    this.isDragging = true;
    this.track.classList.add('grabbing');
    this.stopAutoPlay();
  }

  dragMove(e) {
    if (!this.isDragging) return;
    this.currentTranslate = e.clientX - this.startX;
  }

  dragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.track.classList.remove('grabbing');
    if (this.currentTranslate < -this.dragThreshold) {
      this.next();
    } else if (this.currentTranslate > this.dragThreshold) {
      this.prev();
    }
    this.currentTranslate = 0;
    this.startAutoPlay();
  }

  next() {
    const maxIndex = Math.max(0, this.items.length - this.itemsPerView);
    if (this.currentIndex >= maxIndex) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.updatePosition();
  }

  prev() {
    const maxIndex = Math.max(0, this.items.length - this.itemsPerView);
    if (this.currentIndex <= 0) {
      this.currentIndex = maxIndex;
    } else {
      this.currentIndex--;
    }
    this.updatePosition();
  }

  goTo(index) {
    this.currentIndex = index;
    this.updatePosition();
    this.resetAutoPlay();
  }

  updatePosition() {
    if (!this.track || this.items.length === 0) return;
    
    // Ancho porcentual de cada salto
    const slideWidthPercent = 100 / this.itemsPerView;
    const offset = this.currentIndex * slideWidthPercent;
    
    this.track.style.transform = `translateX(-${offset}%)`;

    // Actualizar dots
    if (this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === this.currentIndex);
      });
    }
  }

  startAutoPlay() {
    if (!this.isAutoPlayActive) return;
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
