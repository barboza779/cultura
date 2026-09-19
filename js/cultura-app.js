/**
 * PERIÓDICO CULTURA - SCRIPT UNIVERSAL DEL PORTAL PÚBLICO
 * "DECANO DE LA PRENSA CORRENTINA" - Curuzú Cuatiá, Corrientes
 * Compatible directamente con file:/// y servidores HTTP sin restricciones CORS.
 */

(function() {
  'use strict';

  // ========================================================================
  // 1. DATOS INICIALES Y ESTRUCTURA
  // ========================================================================
  const INITIAL_NEWS = [
    {
      id: "news-priar-001",
      title: "HISTÓRICO: EL PRIAR DE NUESTRA CIUDAD TIENE UNA NUEVA JEFA, NIEVES TERESA CANTEROS",
      slug: "historico-priar-curuzu-cuatia-nueva-jefa-nieves-teresa-canteros",
      category: "PRIAR",
      date: "Jue. 10 de Septiembre",
      time: "10:45 hs",
      author: "Redacción Periódico Cultura",
      mainImage: "assets/images/noticia-priar.jpg",
      additionalImages: [],
      summary: "En una jornada de enorme trascendencia institucional y comunitaria para Curuzú Cuatiá, la Comisario Inspector Nieves Teresa Canteros asumió formalmente la jefatura de la Policía Rural y de Islas y Ambiental Rural (PRIAR) de nuestra ciudad, marcando un hito sin precedentes en la fuerza.",
      fullContent: `
<p>En una jornada que quedará grabada en las páginas institucionales de nuestra comunidad y de las fuerzas de seguridad de la provincia de Corrientes, la <strong>Comisario Inspector Nieves Teresa Canteros</strong> fue puesta en funciones formalmente como nueva Jefa de la División Policía Rural y de Islas y Ambiental Rural (PRIAR) de Curuzú Cuatiá.</p>

<p>La designación representa un acontecimiento histórico tanto para la fuerza policial como para la ciudad, siendo la primera mujer en asumir el mando operativo de esta estratégica dependencia rural, encargada de la custodia de los extensos departamentos ganaderos del sur correntino y la lucha contra el delito rural y el abigeato.</p>

<p>La ceremonia contó con la presencia de autoridades de la Unidad Regional III, representantes de la Sociedad Rural de Curuzú Cuatiá, jefes de distintas dependencias de seguridad y familiares de la flamante jefa, quien cuenta con una foja de servicio intachable y una vasta trayectoria en el ámbito operativo e investigativo.</p>

<p>En sus primeras palabras tras asumir la conducción, Canteros remarcó: <em>“Asumo este enorme desafío con el compromiso inquebrantable de trabajar codo a codo con los productores, las familias rurales y cada habitante de nuestra jurisdicción. La prevención, la cercanía con el vecino de campo y la respuesta inmediata serán los pilares de nuestra labor diaria”</em>.</p>

<p>Desde <strong>Periódico Cultura</strong> celebramos este trascendental paso que conjuga profesionalismo, vocación de servicio e igualdad de oportunidades en las instituciones de nuestra querida Curuzú Cuatiá.</p>
      `,
      tags: ["PRIAR", "Curuzú Cuatiá", "Seguridad", "Corrientes", "Institucionales"],
      isFeatured: true,
      isActive: true,
      views: 1420
    },
    {
      id: "news-curuzu-002",
      title: "Curuzú Cuatiá fortalece su infraestructura hídrica y de desagües pluviales en barrios periféricos",
      slug: "curuzu-cuatia-fortalece-infraestructura-hidrica-barrios",
      category: "Curuzú Cuatiá",
      date: "Mié. 9 de Septiembre",
      time: "15:20 hs",
      author: "Área de Infraestructura",
      mainImage: "https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=1200&q=80",
      additionalImages: [],
      summary: "Se intensifican los trabajos de entubamiento y limpieza de canales principales para garantizar el normal escurrimiento de las aguas de lluvia antes del período primaveral.",
      fullContent: `
<p>Con cuadrillas municipales y maquinaria pesada, el municipio de Curuzú Cuatiá continúa desarrollando el plan integral de mejoramiento hídrico en diversos puntos neurálgicos de la planta urbana.</p>
<p>Las tareas comprenden la profundización de zanjones colectores y el recambio de alcantarillas en los accesos vecinales, beneficiando a cientos de familias y facilitando la transitabilidad.</p>
      `,
      tags: ["Obras", "Curuzú Cuatiá", "Servicios", "Sociedad"],
      isFeatured: false,
      isActive: true,
      views: 680
    },
    {
      id: "news-cultura-003",
      title: "Cultura y Tradición: Anuncian una nueva edición del Encuentro de Música y Poesía Correntina",
      slug: "cultura-tradicion-anuncian-nueva-edicion-encuentro-musica",
      category: "Cultura",
      date: "Mar. 8 de Septiembre",
      time: "19:00 hs",
      author: "Sección Espectáculos",
      mainImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
      additionalImages: [],
      summary: "Artistas de toda la región se darán cita en la emblemática Casa del Bicentenario para celebrar nuestras raíces chamameceras y el acervo lírico provincial.",
      fullContent: `
<p>Curuzú Cuatiá volverá a vibrar al compás del fuelle y la guitarra en un evento que congregará a destacados exponentes del cancionero popular correntino y nuevas generaciones de músicos locales.</p>
<p>La entrada será libre y gratuita, con servicio de cantina tradicional a beneficio de instituciones comunitarias.</p>
      `,
      tags: ["Chamamé", "Cultura", "Música", "Curuzú Cuatiá"],
      isFeatured: false,
      isActive: true,
      views: 940
    },
    {
      id: "news-deportes-004",
      title: "Gran triunfo de los equipos locales en la apertura del Torneo Interprovincial de Básquet",
      slug: "gran-triunfo-equipos-locales-torneo-interprovincial-basquet",
      category: "Deportes",
      date: "Lun. 7 de Septiembre",
      time: "22:15 hs",
      author: "Corresponsalía Deportiva",
      mainImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
      additionalImages: [],
      summary: "Con un marco imponente de público y clima de fiesta deportiva, los representantes curuzucuateños consiguieron valiosas victorias en el arranque de la competencia regional.",
      fullContent: `
<p>En una noche vibrante y ante tribunas colmadas, el conjunto de Curuzú Cuatiá demostró temple y juego colectivo para imponerse ante su par regional por un ajustado 78-74.</p>
<p>El próximo fin de semana se disputará la segunda fecha en condición de visitante.</p>
      `,
      tags: ["Deportes", "Básquet", "Torneo", "Curuzú Cuatiá"],
      isFeatured: false,
      isActive: true,
      views: 820
    }
  ];

  const INITIAL_ADS = [
    {
      id: "ad-top-01",
      slot: "banner-top",
      title: "Comercio & Empresa de Curuzú Cuatiá",
      description: "Espacio publicitario disponible en Periódico Cultura. Su marca ante miles de lectores en Curuzú Cuatiá y la provincia.",
      imageUrl: "",
      linkUrl: "https://instagram.com/periodico_cultura",
      startDate: "2026-09-01",
      endDate: "2026-12-31",
      isActive: true
    },
    {
      id: "ad-sidebar-01",
      slot: "sidebar-ad",
      title: "Sector Agropecuario & Comercial",
      description: "Impulse su negocio con anuncios en la web del Decano de la Prensa Correntina.",
      imageUrl: "",
      linkUrl: "mailto:redaccion@periodicocultura.com.ar",
      startDate: "2026-09-01",
      endDate: "2026-12-31",
      isActive: true
    },
    {
      id: "ad-feed-01",
      slot: "in-feed-ad",
      title: "Publicidad Destacada en Noticias",
      description: "Llegue de manera directa a los vecinos de la región.",
      imageUrl: "",
      linkUrl: "https://facebook.com/periodico_cultura",
      startDate: "2026-09-01",
      endDate: "2026-12-31",
      isActive: true
    },
    {
      id: "ad-bottom-01",
      slot: "banner-bottom",
      title: "Espacio Institucional",
      description: "Apoye el periodismo independiente de Curuzú Cuatiá.",
      imageUrl: "",
      linkUrl: "mailto:redaccion@periodicocultura.com.ar",
      startDate: "2026-09-01",
      endDate: "2026-12-31",
      isActive: true
    }
  ];

  const INITIAL_CAROUSEL = [
    {
      id: "slide-01",
      title: "Histórica asunción en el PRIAR: Nieves Teresa Canteros al frente de la fuerza",
      category: "PRIAR",
      date: "10 de Septiembre",
      imageUrl: "assets/images/noticia-priar.jpg",
      newsId: "news-priar-001",
      isActive: true,
      order: 1
    },
    {
      id: "slide-02",
      title: "Obras estratégicas de desagües pluviales en diferentes barrios de la ciudad",
      category: "Curuzú Cuatiá",
      date: "9 de Septiembre",
      imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=800&q=80",
      newsId: "news-curuzu-002",
      isActive: true,
      order: 2
    },
    {
      id: "slide-03",
      title: "Preparan el gran Encuentro de Música y Poesía de nuestras raíces chamameceras",
      category: "Cultura",
      date: "8 de Septiembre",
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
      newsId: "news-cultura-003",
      isActive: true,
      order: 3
    },
    {
      id: "slide-04",
      title: "Apasionante inicio de la temporada de básquet con victorias locales",
      category: "Deportes",
      date: "7 de Septiembre",
      imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
      newsId: "news-deportes-004",
      isActive: true,
      order: 4
    }
  ];

  // ========================================================================
  // 2. SERVICIOS DE ALMACENAMIENTO Y CONSULTAS
  // ========================================================================
  const STORAGE_KEYS = {
    NEWS: 'periodico_cultura_news',
    ADS: 'periodico_cultura_ads',
    CAROUSEL: 'periodico_cultura_carousel',
    SETTINGS: 'periodico_cultura_settings'
  };

  const StorageService = {
    getNews() {
      try {
        const data = localStorage.getItem(STORAGE_KEYS.NEWS);
        if (!data) {
          this.saveNews(INITIAL_NEWS);
          return INITIAL_NEWS;
        }
        return JSON.parse(data);
      } catch (e) {
        return INITIAL_NEWS;
      }
    },
    saveNews(arr) {
      try {
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(arr));
        window.dispatchEvent(new CustomEvent('cultura:news-updated'));
      } catch (e) {}
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
        return INITIAL_ADS;
      }
    },
    saveAds(arr) {
      try {
        localStorage.setItem(STORAGE_KEYS.ADS, JSON.stringify(arr));
        window.dispatchEvent(new CustomEvent('cultura:ads-updated'));
      } catch (e) {}
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
        return INITIAL_CAROUSEL;
      }
    },
    saveCarousel(arr) {
      try {
        localStorage.setItem(STORAGE_KEYS.CAROUSEL, JSON.stringify(arr));
        window.dispatchEvent(new CustomEvent('cultura:carousel-updated'));
      } catch (e) {}
    }
  };

  const NewsService = {
    getAll() {
      return StorageService.getNews().filter(n => n.isActive);
    },
    getFeatured() {
      const all = this.getAll();
      return all.find(n => n.isFeatured) || all[0] || null;
    },
    getByCategory(category) {
      const all = this.getAll();
      if (!category || category === 'TODAS') return all;
      return all.filter(n => (n.category || '').toUpperCase() === category.toUpperCase());
    },
    getById(id) {
      return StorageService.getNews().find(n => n.id === id) || null;
    },
    incrementViews(id) {
      const all = StorageService.getNews();
      const item = all.find(n => n.id === id);
      if (item) {
        item.views = (item.views || 0) + 1;
        StorageService.saveNews(all);
      }
    }
  };

  const AdsService = {
    getBySlot(slot) {
      const active = StorageService.getAds().filter(ad => ad.isActive);
      return active.find(ad => ad.slot === slot) || null;
    }
  };

  // ========================================================================
  // 3. SERVICIO METEOROLÓGICO
  // ========================================================================
  const WeatherService = {
    getDemo() {
      return {
        sourceLabel: "Demostración técnica (Curuzú Cuatiá)",
        city: "Curuzú Cuatiá",
        temperature: 24,
        conditionText: "Parcialmente nublado",
        feelsLike: 25,
        tempMax: 28,
        tempMin: 16,
        humidity: 62,
        windSpeed: 14,
        windDirection: "SE",
        lastUpdated: "Datos de demostración"
      };
    },

    async fetchLive() {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=-29.7917&longitude=-58.0547&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FArgentina%2FBuenos_Aires`;
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 4000);
        const res = await fetch(url, { signal: ctrl.signal });
        clearTimeout(tid);
        if (!res.ok) throw new Error("HTTP error");
        const data = await res.json();
        const cur = data.current;
        const dly = data.daily;
        
        let condition = "Parcialmente nublado";
        if (cur.weather_code === 0) condition = cur.is_day ? "Cielo despejado" : "Noche clara";
        else if (cur.weather_code >= 61 && cur.weather_code <= 65) condition = "Lluvia";
        else if (cur.weather_code >= 95) condition = "Tormenta";

        const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
        const dir = dirs[Math.round(cur.wind_direction_10m / 45) % 8];

        return {
          sourceLabel: "Datos en vivo (Open-Meteo)",
          city: "Curuzú Cuatiá",
          temperature: Math.round(cur.temperature_2m),
          conditionText: condition,
          feelsLike: Math.round(cur.apparent_temperature),
          tempMax: Math.round(dly.temperature_2m_max[0]),
          tempMin: Math.round(dly.temperature_2m_min[0]),
          humidity: Math.round(cur.relative_humidity_2m),
          windSpeed: Math.round(cur.wind_speed_10m),
          windDirection: dir,
          lastUpdated: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
        };
      } catch (e) {
        return this.getDemo();
      }
    }
  };

  // ========================================================================
  // 4. COMPONENTES: MODAL READER, CARRUSEL, PUBLICIDAD, CLIMA
  // ========================================================================
  const ModalReader = {
    dialogEl: null,
    init() {
      this.dialogEl = document.getElementById('article-reader-dialog');
      if (!this.dialogEl) return;

      const closeBtn = this.dialogEl.querySelector('.dialog-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', () => this.close());

      this.dialogEl.addEventListener('click', (e) => {
        const rect = this.dialogEl.getBoundingClientRect();
        const isIn = (
          rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX && e.clientX <= rect.left + rect.width
        );
        if (!isIn) this.close();
      });

      this.dialogEl.addEventListener('cancel', () => {
        document.body.style.overflow = '';
      });
    },

    open(newsId) {
      if (!this.dialogEl) this.init();
      const news = NewsService.getById(newsId);
      if (!news) return;

      NewsService.incrementViews(newsId);

      const bodyContainer = this.dialogEl.querySelector('.dialog-body');
      if (!bodyContainer) return;

      const tagsHtml = (news.tags || []).map(t => `<span class="dialog-tag">#${t}</span>`).join('');
      const pageUrl = encodeURIComponent(window.location.href);
      const shareTitle = encodeURIComponent(`${news.title} - Periódico Cultura`);

      bodyContainer.innerHTML = `
        <div class="dialog-meta">
          <span class="badge-category">${news.category || 'GENERAL'}</span>
          <span class="dialog-date">📅 ${news.date} • 🕒 ${news.time || '10:45 hs'}</span>
        </div>

        <h1 class="dialog-title">${news.title}</h1>

        ${news.summary ? `<div class="dialog-lead">${news.summary}</div>` : ''}

        <div class="dialog-featured-media">
          <img src="${news.mainImage || 'assets/images/noticia-priar.jpg'}" alt="${news.title}" class="dialog-featured-img" />
          <div class="dialog-caption">Fotografía: Archivo Oficial Periódico Cultura - Curuzú Cuatiá</div>
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
          <button type="button" class="share-btn share-copy" id="btn-copy-link">
            📋 Copiar enlace
          </button>
        </div>
      `;

      const copyBtn = bodyContainer.querySelector('#btn-copy-link');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            const toast = document.createElement('div');
            toast.className = 'toast-notice';
            toast.innerHTML = '<span>✓</span> <span>¡Enlace copiado al portapapeles!</span>';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
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
    }
  };

  class CarouselComponent {
    constructor(selector) {
      this.container = document.querySelector(selector);
      if (!this.container) return;
      this.track = this.container.querySelector('.carousel-track');
      this.prevBtn = document.querySelector('.carousel-btn.prev');
      this.nextBtn = document.querySelector('.carousel-btn.next');
      this.dotsContainer = document.querySelector('.carousel-dots');
      this.currentIndex = 0;
      this.itemsPerView = this.getCount();
      this.autoInterval = null;

      this.startX = 0;
      this.trans = 0;
      this.isDrag = false;

      this.init();
    }

    getCount() {
      if (window.innerWidth >= 992) return 3;
      if (window.innerWidth >= 600) return 2;
      return 1;
    }

    init() {
      this.render();
      this.bind();
      this.startAuto();

      window.addEventListener('cultura:carousel-updated', () => this.render());
      window.addEventListener('resize', () => {
        const c = this.getCount();
        if (c !== this.itemsPerView) {
          this.itemsPerView = c;
          this.update();
        }
      });
    }

    render() {
      const items = StorageService.getCarousel().filter(i => i.isActive);
      if (!this.track) return;
      this.items = items;

      if (items.length === 0) {
        this.track.innerHTML = '<div style="padding:2rem; width:100%; text-align:center; color:#888;">No hay publicaciones en el carrusel.</div>';
        return;
      }

      this.track.innerHTML = items.map((it, idx) => `
        <article class="carousel-slide" data-news-id="${it.newsId || ''}" style="cursor: pointer;">
          <div class="slide-img-wrapper">
            <img src="${it.imageUrl || 'assets/images/noticia-priar.jpg'}" alt="${it.title}" class="slide-img" loading="lazy" />
          </div>
          <div class="slide-content">
            <div class="slide-category">
              <span class="badge-category">${it.category || 'NOTICIA'}</span>
            </div>
            <h4 class="slide-title">${it.title}</h4>
            <span class="slide-date">📅 ${it.date || ''}</span>
          </div>
        </article>
      `).join('');

      this.renderDots();
      this.update();
    }

    renderDots() {
      if (!this.dotsContainer) return;
      const max = Math.max(0, this.items.length - this.itemsPerView);
      this.dotsContainer.innerHTML = '';
      for (let i = 0; i <= max; i++) {
        const b = document.createElement('button');
        b.className = `carousel-dot ${i === this.currentIndex ? 'active' : ''}`;
        b.addEventListener('click', () => {
          this.currentIndex = i;
          this.update();
        });
        this.dotsContainer.appendChild(b);
      }
    }

    bind() {
      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

      this.track.addEventListener('click', (e) => {
        const slide = e.target.closest('.carousel-slide');
        if (slide) {
          const nid = slide.getAttribute('data-news-id');
          if (nid) ModalReader.open(nid);
        }
      });

      // Touch events
      this.track.addEventListener('touchstart', (e) => {
        this.startX = e.touches[0].clientX;
        this.isDrag = true;
        this.stopAuto();
      }, { passive: true });

      this.track.addEventListener('touchmove', (e) => {
        if (!this.isDrag) return;
        this.trans = e.touches[0].clientX - this.startX;
      }, { passive: true });

      this.track.addEventListener('touchend', () => {
        if (!this.isDrag) return;
        this.isDrag = false;
        if (this.trans < -45) this.next();
        else if (this.trans > 45) this.prev();
        this.trans = 0;
        this.startAuto();
      });
    }

    next() {
      const max = Math.max(0, this.items.length - this.itemsPerView);
      this.currentIndex = this.currentIndex >= max ? 0 : this.currentIndex + 1;
      this.update();
    }

    prev() {
      const max = Math.max(0, this.items.length - this.itemsPerView);
      this.currentIndex = this.currentIndex <= 0 ? max : this.currentIndex - 1;
      this.update();
    }

    update() {
      if (!this.track || !this.items || this.items.length === 0) return;
      const pct = 100 / this.itemsPerView;
      this.track.style.transform = `translateX(-${this.currentIndex * pct}%)`;
      if (this.dotsContainer) {
        this.dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
          d.classList.toggle('active', i === this.currentIndex);
        });
      }
    }

    startAuto() {
      this.stopAuto();
      this.autoInterval = setInterval(() => this.next(), 5500);
    }

    stopAuto() {
      if (this.autoInterval) clearInterval(this.autoInterval);
    }
  }

  const WeatherComponent = {
    async init() {
      const box = document.getElementById('weather-widget-container');
      if (!box) return;

      const render = (data) => {
        box.innerHTML = `
          <div class="weather-card">
            <div class="weather-header">
              <div class="weather-title-box">
                <h3>Clima en Curuzú Cuatiá</h3>
                <span class="weather-source-badge">${data.sourceLabel}</span>
              </div>
              <button type="button" class="weather-refresh-btn" id="btn-weather-refresh" title="Refrescar clima">🔄</button>
            </div>
            <div class="weather-main">
              <div class="weather-temp-huge">${data.temperature}<span>°C</span></div>
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

        const ref = box.querySelector('#btn-weather-refresh');
        if (ref) {
          ref.addEventListener('click', async () => {
            ref.style.transform = 'rotate(360deg)';
            const live = await WeatherService.fetchLive();
            render(live);
          });
        }
      };

      // 1. Mostrar demo de inmediato
      render(WeatherService.getDemo());
      // 2. Consultar en vivo en segundo plano
      const live = await WeatherService.fetchLive();
      render(live);
    }
  };

  const AdsComponent = {
    init() {
      this.render();
      window.addEventListener('cultura:ads-updated', () => this.render());
    },
    render() {
      this.slot('banner-top', '.ad-slot-banner-top');
      this.slot('sidebar-ad', '.ad-slot-sidebar');
      this.slot('in-feed-ad', '.ad-slot-in-feed');
      this.slot('carousel-ad', '.ad-slot-carousel');
      this.slot('banner-bottom', '.ad-slot-banner-bottom');
    },
    slot(slotName, selector) {
      const el = document.querySelector(selector);
      if (!el) return;
      const ad = AdsService.getBySlot(slotName);
      if (!ad) {
        el.style.display = 'none';
        return;
      }
      el.style.display = '';

      if (ad.imageUrl) {
        el.innerHTML = `
          <span class="ad-label">Espacio Publicitario</span>
          <a href="${ad.linkUrl || '#'}" target="_blank" rel="noopener noreferrer" class="ad-link" title="${ad.title}">
            <img src="${ad.imageUrl}" alt="${ad.title}" class="ad-image" loading="lazy" />
          </a>
        `;
      } else {
        el.innerHTML = `
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

  // ========================================================================
  // 5. INICIALIZACIÓN GLOBAL DE LA APLICACIÓN
  // ========================================================================
  const App = {
    activeCat: 'TODAS',

    init() {
      this.dateTime();
      this.renderHero();
      this.renderGrid();
      this.filters();
      ModalReader.init();
      new CarouselComponent('#news-carousel');
      WeatherComponent.init();
      AdsComponent.init();
      this.events();
    },

    dateTime() {
      const el = document.getElementById('live-datetime');
      if (!el) return;
      const d = new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      el.textContent = d.charAt(0).toUpperCase() + d.slice(1);
    },

    renderHero() {
      const box = document.getElementById('hero-story-container');
      if (!box) return;

      const f = NewsService.getFeatured();
      if (!f) {
        box.innerHTML = '<div style="padding:2rem; background:#fff; text-align:center;">No hay noticia principal asignada.</div>';
        return;
      }

      box.innerHTML = `
        <article class="hero-news-card" data-news-id="${f.id}">
          <div class="hero-media-wrapper">
            <img src="${f.mainImage || 'assets/images/noticia-priar.jpg'}" alt="${f.title}" class="hero-image" fetchpriority="high" />
            <div class="hero-watermark">
              <span>📷</span>
              <span>PERIÓDICO CULTURA</span>
            </div>
          </div>
          <div class="hero-body">
            <div>
              <div class="hero-meta-top">
                <span class="badge-category">${f.category || 'PRIAR'}</span>
                <span class="hero-date">📅 ${f.date}</span>
              </div>
              <h2 class="hero-title">
                <a href="#" class="btn-read-hero" data-id="${f.id}">${f.title}</a>
              </h2>
              <p class="hero-excerpt">${f.summary}</p>
            </div>
            <div class="hero-footer">
              <div class="hero-author">
                <span>✍️ <strong>${f.author || 'Redacción Periódico Cultura'}</strong></span>
              </div>
              <button type="button" class="btn btn-primary btn-read-hero" data-id="${f.id}">
                Leer noticia completa &rarr;
              </button>
            </div>
          </div>
        </article>
      `;

      box.querySelectorAll('.btn-read-hero').forEach(el => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          ModalReader.open(f.id);
        });
      });

      const tick = document.getElementById('ticker-headline');
      if (tick) tick.textContent = f.title;
    },

    renderGrid() {
      const grid = document.getElementById('news-feed-grid');
      if (!grid) return;

      const f = NewsService.getFeatured();
      const fid = f ? f.id : null;
      let list = NewsService.getByCategory(this.activeCat);

      if (this.activeCat === 'TODAS' && fid) {
        list = list.filter(n => n.id !== fid);
      }

      if (list.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1/-1; background:#fff; padding:3rem 1.5rem; text-align:center; border-radius:8px; border:1px dashed #cbd5e1;">
            <h4 style="color:#334155; margin-bottom:0.5rem;">No hay publicaciones en "${this.activeCat}"</h4>
            <p style="color:#64748b; font-size:0.9rem;">Próximamente se redactarán nuevas noticias desde Curuzú Cuatiá.</p>
          </div>
        `;
        return;
      }

      grid.innerHTML = list.map(it => `
        <article class="news-card" data-news-id="${it.id}">
          <div class="card-media">
            <img src="${it.mainImage || 'assets/images/noticia-priar.jpg'}" alt="${it.title}" class="card-img" loading="lazy" />
            <span class="card-category-badge badge-category">${it.category}</span>
          </div>
          <div class="card-content">
            <div class="card-meta">
              <span>📅 ${it.date}</span>
              <span>•</span>
              <span>🕒 ${it.time || '10:45'}</span>
            </div>
            <h3 class="card-title">
              <a href="#" class="btn-read-card" data-id="${it.id}">${it.title}</a>
            </h3>
            <p class="card-excerpt">${it.summary || ''}</p>
            <div class="card-footer">
              <span class="text-muted" style="font-size:0.775rem;">✍️ ${it.author || 'Redacción'}</span>
              <button type="button" class="read-more-link btn-read-card" data-id="${it.id}">
                Leer más &rarr;
              </button>
            </div>
          </div>
        </article>
      `).join('');

      grid.querySelectorAll('.btn-read-card').forEach(el => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          ModalReader.open(el.getAttribute('data-id'));
        });
      });
    },

    filters() {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.addEventListener('click', () => {
          document.querySelectorAll('.filter-btn').forEach(x => x.classList.remove('active'));
          b.classList.add('active');
          this.activeCat = b.getAttribute('data-category');
          this.renderGrid();
        });
      });
    },

    events() {
      window.addEventListener('cultura:news-updated', () => {
        this.renderHero();
        this.renderGrid();
      });

      const mob = document.getElementById('mobile-menu-toggle');
      const nav = document.getElementById('main-nav-links');
      if (mob && nav) {
        mob.addEventListener('click', () => {
          nav.style.display = nav.style.display === 'flex' ? '' : 'flex';
        });
      }

      document.querySelectorAll('.nav-link[data-filter]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const cat = link.getAttribute('data-filter');
          this.activeCat = cat;
          document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-category') === cat);
          });
          this.renderGrid();
          const sec = document.getElementById('seccion-noticias');
          if (sec) sec.scrollIntoView({ behavior: 'smooth' });
        });
      });
    }
  };

  // Exponer API en ventana global y arrancar
  window.Cultura = {
    StorageService,
    NewsService,
    AdsService,
    WeatherService,
    ModalReader,
    App
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
  } else {
    App.init();
  }
})();
