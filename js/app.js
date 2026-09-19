/**
 * PERIÓDICO CULTURA - CONTROLADOR PRINCIPAL DEL PORTAL PÚBLICO (APP.JS)
 * Coordina la vista de una sola página, renderizado dinámico, filtros y widgets.
 */

import { NewsService } from './services/newsService.js';
import { StorageService } from './services/storageService.js';
import { NewsCarousel } from './components/carousel.js';
import { ModalReader } from './components/modalReader.js';
import { WeatherWidget } from './components/weatherWidget.js';
import { AdsRenderer } from './components/adsRenderer.js';

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  activeCategory: 'TODAS',
  carouselInstance: null,

  init() {
    this.initDateTime();
    this.renderHeroStory();
    this.renderNewsGrid();
    this.initCategoryFilters();
    this.initComponents();
    this.bindEvents();
  },

  // Fecha y hora local
  initDateTime() {
    const dateEl = document.getElementById('live-datetime');
    if (!dateEl) return;

    const updateDate = () => {
      const now = new Date();
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      const dateStr = now.toLocaleDateString('es-AR', options);
      // Capitalizar primera letra
      dateEl.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    };

    updateDate();
  },

  // Noticia Principal (Hero)
  renderHeroStory() {
    const container = document.getElementById('hero-story-container');
    if (!container) return;

    const featured = NewsService.getFeatured();
    if (!featured) {
      container.innerHTML = `<div style="padding: 2rem; background: #fff; text-align: center;">No hay noticia principal asignada en este momento.</div>`;
      return;
    }

    container.innerHTML = `
      <article class="hero-news-card" data-news-id="${featured.id}">
        <div class="hero-media-wrapper">
          <img 
            src="${featured.mainImage || 'assets/images/noticia-priar.jpg'}" 
            alt="${featured.title}" 
            class="hero-image"
            fetchpriority="high"
          />
          <div class="hero-watermark">
            <span>📷</span>
            <span>PERIÓDICO CULTURA</span>
          </div>
        </div>

        <div class="hero-body">
          <div>
            <div class="hero-meta-top">
              <span class="badge-category">${featured.category || 'PRIAR'}</span>
              <span class="hero-date">📅 ${featured.date}</span>
            </div>

            <h2 class="hero-title">
              <a href="#" class="btn-read-hero" data-id="${featured.id}">${featured.title}</a>
            </h2>

            <p class="hero-excerpt">
              ${featured.summary}
            </p>
          </div>

          <div class="hero-footer">
            <div class="hero-author">
              <span>✍️ <strong>${featured.author || 'Redacción Periódico Cultura'}</strong></span>
            </div>
            <button type="button" class="btn btn-primary btn-read-hero" data-id="${featured.id}">
              Leer noticia completa &rarr;
            </button>
          </div>
        </div>
      </article>
    `;

    // Vincular clicks a apertura de modal
    container.querySelectorAll('.btn-read-hero').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        ModalReader.open(featured.id);
      });
    });

    // Actualizar cinta de última hora con el titular principal
    const tickerText = document.getElementById('ticker-headline');
    if (tickerText) {
      tickerText.textContent = featured.title;
    }
  },

  // Grilla de noticias secundarias y futuras
  renderNewsGrid() {
    const grid = document.getElementById('news-feed-grid');
    if (!grid) return;

    const featured = NewsService.getFeatured();
    const featuredId = featured ? featured.id : null;

    let newsList = NewsService.getByCategory(this.activeCategory);

    // Si estamos en TODAS, excluimos la principal para no duplicarla inmediatamente
    if (this.activeCategory === 'TODAS' && featuredId) {
      newsList = newsList.filter(n => n.id !== featuredId);
    }

    if (newsList.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; background: #fff; padding: 3rem 1.5rem; text-align: center; border-radius: 8px; border: 1px dashed var(--color-gray-400);">
          <h4 style="color: var(--color-gray-700); margin-bottom: 0.5rem;">No hay noticias disponibles en la categoría "${this.activeCategory}"</h4>
          <p style="color: var(--color-gray-500); font-size: 0.9rem;">Próximamente se publicarán nuevas notas desde la sala de redacción de Curuzú Cuatiá.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = newsList.map(item => `
      <article class="news-card" data-news-id="${item.id}">
        <div class="card-media">
          <img src="${item.mainImage || 'assets/images/noticia-priar.jpg'}" alt="${item.title}" class="card-img" loading="lazy" />
          <span class="card-category-badge badge-category">${item.category}</span>
        </div>
        <div class="card-content">
          <div class="card-meta">
            <span>📅 ${item.date}</span>
            <span>•</span>
            <span>🕒 ${item.time || '12:00'}</span>
          </div>
          <h3 class="card-title">
            <a href="#" class="btn-read-card" data-id="${item.id}">${item.title}</a>
          </h3>
          <p class="card-excerpt">${item.summary || ''}</p>
          <div class="card-footer">
            <span class="text-muted" style="font-size: 0.775rem;">✍️ ${item.author || 'Redacción'}</span>
            <button type="button" class="read-more-link btn-read-card" data-id="${item.id}">
              Leer más &rarr;
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Eventos de click en las tarjetas
    grid.querySelectorAll('.btn-read-card').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const id = el.getAttribute('data-id');
        ModalReader.open(id);
      });
    });
  },

  // Filtros de categoría sin recarga
  initCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeCategory = btn.getAttribute('data-category');
        this.renderNewsGrid();
      });
    });
  },

  initComponents() {
    ModalReader.init();
    this.carouselInstance = new NewsCarousel('#news-carousel');
    WeatherWidget.init('#weather-widget-container');
    AdsRenderer.init();
  },

  bindEvents() {
    // Escuchar actualizaciones de noticias
    window.addEventListener('cultura:news-updated', () => {
      this.renderHeroStory();
      this.renderNewsGrid();
    });

    // Menú móvil
    const mobileBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('main-nav-links');
    if (mobileBtn && navLinks) {
      mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
      });
    }

    // Enlaces de navegación interna
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const cat = link.getAttribute('data-filter');
        if (cat) {
          e.preventDefault();
          this.activeCategory = cat;
          document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-category') === cat);
          });
          this.renderNewsGrid();
          // Scroll hacia la grilla
          const target = document.getElementById('seccion-noticias');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }
};
