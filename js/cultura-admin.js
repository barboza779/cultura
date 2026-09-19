/**
 * PERIÓDICO CULTURA - SCRIPT UNIVERSAL DEL PANEL DE AUTOGESTIÓN
 * "DECANO DE LA PRENSA CORRENTINA" - Curuzú Cuatiá, Corrientes
 * Compatible directamente con file:/// y servidores HTTP sin restricciones CORS.
 */

(function() {
  'use strict';

  const STORAGE_KEYS = {
    NEWS: 'periodico_cultura_news',
    ADS: 'periodico_cultura_ads',
    CAROUSEL: 'periodico_cultura_carousel',
    SETTINGS: 'periodico_cultura_settings'
  };

  const AD_SLOTS = [
    { id: 'banner-top', name: 'Banner Superior (Cabecera)' },
    { id: 'sidebar-ad', name: 'Publicidad Lateral (Computadora)' },
    { id: 'in-feed-ad', name: 'Publicidad Entre Noticias' },
    { id: 'carousel-ad', name: 'Publicidad en Carrusel' },
    { id: 'banner-bottom', name: 'Banner Inferior (Pie)' }
  ];

  const ADMIN_PASSWORD = "CULTURACURUZU";
  const AUTH_SESSION_KEY = "cultura_auth_session";

  const Storage = {
    get(key, fallback) {
      try {
        const d = localStorage.getItem(key);
        return d ? JSON.parse(d) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set(key, val) {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch (e) {
        console.error("Storage write error", e);
      }
    },
    resetAll() {
      localStorage.clear();
    }
  };

  const AdminApp = {
    currentNewsId: null,
    currentAdId: null,
    currentSlideId: null,

    isAuthenticated() {
      return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    },

    init() {
      this.initAuth();
      if (this.isAuthenticated()) {
        this.unlockPanel();
      } else {
        this.lockPanel();
      }
    },

    initAuth() {
      const form = document.getElementById('form-auth-login');
      const pwInput = document.getElementById('auth-password-input');
      const errorMsg = document.getElementById('auth-error-msg');
      const togglePwBtn = document.getElementById('btn-toggle-password-visibility');
      const logoutBtn = document.getElementById('btn-admin-logout');

      if (togglePwBtn && pwInput) {
        togglePwBtn.addEventListener('click', () => {
          const isPassword = pwInput.type === 'password';
          pwInput.type = isPassword ? 'text' : 'password';
          togglePwBtn.textContent = isPassword ? '🔒' : '👁️';
        });
      }

      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const entered = pwInput.value.trim();

          if (entered === ADMIN_PASSWORD) {
            sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
            if (errorMsg) errorMsg.style.display = 'none';
            pwInput.value = '';
            this.unlockPanel();
          } else {
            if (errorMsg) {
              errorMsg.innerHTML = '<span>⚠️</span> <span>Contraseña incorrecta. Acceso denegado a la sala de redacción.</span>';
              errorMsg.style.display = 'flex';
              // Reiniciar animación de sacudida
              errorMsg.style.animation = 'none';
              errorMsg.offsetHeight; /* trigger reflow */
              errorMsg.style.animation = 'shakeError 0.35s ease';
            }
            pwInput.value = '';
            pwInput.focus();
          }
        });
      }

      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          if (confirm("¿Desea cerrar la sesión de Autogestión?")) {
            sessionStorage.removeItem(AUTH_SESSION_KEY);
            this.lockPanel();
          }
        });
      }
    },

    lockPanel() {
      const authScreen = document.getElementById('auth-screen');
      const mainLayout = document.getElementById('admin-main-layout');
      const userBadge = document.getElementById('auth-user-badge');
      const logoutBtn = document.getElementById('btn-admin-logout');

      if (authScreen) authScreen.style.display = 'flex';
      if (mainLayout) mainLayout.style.display = 'none';
      if (userBadge) userBadge.style.display = 'none';
      if (logoutBtn) logoutBtn.style.display = 'none';

      const pwInput = document.getElementById('auth-password-input');
      if (pwInput) pwInput.focus();
    },

    unlockPanel() {
      const authScreen = document.getElementById('auth-screen');
      const mainLayout = document.getElementById('admin-main-layout');
      const userBadge = document.getElementById('auth-user-badge');
      const logoutBtn = document.getElementById('btn-admin-logout');

      if (authScreen) authScreen.style.display = 'none';
      if (mainLayout) mainLayout.style.display = 'flex';
      if (userBadge) userBadge.style.display = 'inline-block';
      if (logoutBtn) logoutBtn.style.display = 'inline-flex';

      this.initTabs();
      this.renderDashboard();
      this.renderNews();
      this.renderAds();
      this.renderCarousel();
      this.renderSettings();
      this.bindForms();
    },

    initTabs() {
      document.querySelectorAll('.admin-nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
          const tab = btn.getAttribute('data-tab');
          if (!tab) return;
          document.querySelectorAll('.admin-nav-item').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          document.querySelectorAll('.admin-tab-pane').forEach(p => p.classList.remove('active'));
          const target = document.getElementById(`tab-${tab}`);
          if (target) target.classList.add('active');

          if (tab === 'dashboard') this.renderDashboard();
          if (tab === 'noticias') this.renderNews();
          if (tab === 'publicidad') this.renderAds();
          if (tab === 'carrusel') this.renderCarousel();
          if (tab === 'vistaprevia') {
            const f = document.getElementById('preview-frame');
            if (f) f.contentWindow.location.reload();
          }
        });
      });
    },

    // 1. DASHBOARD
    renderDashboard() {
      const news = Storage.get(STORAGE_KEYS.NEWS, []);
      const ads = Storage.get(STORAGE_KEYS.ADS, []);
      const activeAds = ads.filter(a => a.isActive);
      const carousel = Storage.get(STORAGE_KEYS.CAROUSEL, []);
      const featured = news.find(n => n.isFeatured) || news[0];

      const nEl = document.getElementById('metric-total-news');
      const fEl = document.getElementById('metric-featured-title');
      const aEl = document.getElementById('metric-active-ads');
      const cEl = document.getElementById('metric-carousel-slides');

      if (nEl) nEl.textContent = news.length;
      if (fEl) fEl.textContent = featured ? (featured.title.substring(0, 42) + '...') : 'Sin asignar';
      if (aEl) aEl.textContent = `${activeAds.length} / ${ads.length}`;
      if (cEl) cEl.textContent = carousel.length;

      const tb = document.getElementById('dashboard-recent-news');
      if (tb) {
        tb.innerHTML = news.slice(0, 4).map(n => `
          <tr>
            <td><img src="${n.mainImage || 'assets/images/noticia-priar.jpg'}" class="item-thumb" alt="" /></td>
            <td><strong>${n.title}</strong></td>
            <td><span class="badge-category">${n.category}</span></td>
            <td>${n.isFeatured ? '<span class="badge-principal">★ Principal</span>' : 'Secundaria'}</td>
            <td><span class="badge-status ${n.isActive ? 'active' : 'inactive'}">${n.isActive ? 'Activa' : 'Oculta'}</span></td>
          </tr>
        `).join('');
      }
    },

    // 2. NOTICIAS
    renderNews() {
      const tb = document.getElementById('admin-news-table-body');
      if (!tb) return;
      const news = Storage.get(STORAGE_KEYS.NEWS, []);

      if (news.length === 0) {
        tb.innerHTML = '<tr><td colspan="7" style="text-align:center; padding:2rem;">No hay noticias creadas.</td></tr>';
        return;
      }

      tb.innerHTML = news.map(n => `
        <tr>
          <td><img src="${n.mainImage || 'assets/images/noticia-priar.jpg'}" class="item-thumb" alt="" /></td>
          <td style="max-width: 320px;">
            <strong>${n.title}</strong>
            <div style="font-size:0.75rem; color:#64748b; margin-top:2px;">Por: ${n.author || 'Redacción'} • ${n.time || ''}</div>
          </td>
          <td><span class="badge-category">${n.category}</span></td>
          <td style="white-space:nowrap; font-size:0.8rem;">${n.date}</td>
          <td>
            ${n.isFeatured 
              ? '<span class="badge-principal">★ Principal</span>' 
              : `<button class="btn-icon star btn-set-lead" data-id="${n.id}" title="Poner en Portada">☆</button>`
            }
          </td>
          <td>
            <button class="badge-status ${n.isActive ? 'active' : 'inactive'} btn-toggle-news" data-id="${n.id}">
              ${n.isActive ? 'Activa' : 'Inactiva'}
            </button>
          </td>
          <td>
            <div class="table-actions">
              <button class="btn-icon btn-edit-news" data-id="${n.id}" title="Editar">✏️</button>
              <button class="btn-icon danger btn-del-news" data-id="${n.id}" title="Eliminar">🗑️</button>
            </div>
          </td>
        </tr>
      `).join('');

      tb.querySelectorAll('.btn-set-lead').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          news.forEach(item => { item.isFeatured = (item.id === id); });
          Storage.set(STORAGE_KEYS.NEWS, news);
          this.renderNews();
          this.renderDashboard();
        });
      });

      tb.querySelectorAll('.btn-toggle-news').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const target = news.find(x => x.id === id);
          if (target) {
            target.isActive = !target.isActive;
            Storage.set(STORAGE_KEYS.NEWS, news);
            this.renderNews();
            this.renderDashboard();
          }
        });
      });

      tb.querySelectorAll('.btn-edit-news').forEach(btn => {
        btn.addEventListener('click', () => {
          this.openNewsModal(btn.getAttribute('data-id'));
        });
      });

      tb.querySelectorAll('.btn-del-news').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (confirm("¿Desea eliminar definitivamente esta noticia?")) {
            const filtered = news.filter(x => x.id !== id);
            if (news.find(x => x.id === id)?.isFeatured && filtered.length > 0) {
              filtered[0].isFeatured = true;
            }
            Storage.set(STORAGE_KEYS.NEWS, filtered);
            this.renderNews();
            this.renderDashboard();
          }
        });
      });
    },

    openNewsModal(id = null) {
      this.currentNewsId = id;
      const modal = document.getElementById('modal-news-editor');
      const form = document.getElementById('form-news-editor');
      const titleM = document.getElementById('news-modal-title');
      const prev = document.getElementById('news-image-preview');

      form.reset();
      prev.src = '';
      prev.style.display = 'none';

      if (id) {
        const news = Storage.get(STORAGE_KEYS.NEWS, []);
        const item = news.find(x => x.id === id);
        if (!item) return;

        titleM.textContent = "Editar Noticia";
        form.newsTitle.value = item.title;
        form.newsCategory.value = item.category;
        form.newsDate.value = item.date;
        form.newsTime.value = item.time || '';
        form.newsAuthor.value = item.author || '';
        form.newsSummary.value = item.summary || '';
        form.newsContent.value = item.fullContent || '';
        form.newsTags.value = (item.tags || []).join(', ');
        form.newsImageUrl.value = item.mainImage || '';
        form.newsIsFeatured.checked = !!item.isFeatured;
        form.newsIsActive.checked = !!item.isActive;

        if (item.mainImage) {
          prev.src = item.mainImage;
          prev.style.display = 'block';
        }
      } else {
        titleM.textContent = "Agregar Nueva Noticia";
        form.newsDate.value = new Date().toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' });
        form.newsTime.value = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + ' hs';
        form.newsAuthor.value = "Redacción Periódico Cultura";
        form.newsIsActive.checked = true;
      }

      modal.showModal();
    },

    // 3. PUBLICIDAD
    renderAds() {
      const tb = document.getElementById('admin-ads-table-body');
      if (!tb) return;
      const ads = Storage.get(STORAGE_KEYS.ADS, []);

      tb.innerHTML = ads.map(a => {
        const sl = AD_SLOTS.find(s => s.id === a.slot);
        const name = sl ? sl.name : a.slot;

        return `
          <tr>
            <td>
              <strong>${name}</strong>
              <div style="font-size:0.75rem; color:#64748b;">${a.slot}</div>
            </td>
            <td>
              <strong>${a.title || 'Sin título'}</strong>
              <div style="font-size:0.75rem; color:#64748b;">${a.description || ''}</div>
            </td>
            <td>
              ${a.imageUrl 
                ? `<img src="${a.imageUrl}" class="item-thumb" alt="" />`
                : '<span style="font-size:0.75rem; color:#94a3b8;">Placeholder de venta</span>'
              }
            </td>
            <td><span style="font-size:0.75rem; color:#d71920;">${a.linkUrl || 'N/A'}</span></td>
            <td style="font-size:0.75rem;">${a.startDate || 'Inmediato'} a ${a.endDate || 'Indefinido'}</td>
            <td>
              <button class="badge-status ${a.isActive ? 'active' : 'inactive'} btn-toggle-ad" data-id="${a.id}">
                ${a.isActive ? 'Activo' : 'Inactivo'}
              </button>
            </td>
            <td>
              <div class="table-actions">
                <button class="btn-icon btn-edit-ad" data-id="${a.id}" title="Editar">✏️</button>
                <button class="btn-icon danger btn-del-ad" data-id="${a.id}" title="Eliminar">🗑️</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      tb.querySelectorAll('.btn-toggle-ad').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const target = ads.find(x => x.id === id);
          if (target) {
            target.isActive = !target.isActive;
            Storage.set(STORAGE_KEYS.ADS, ads);
            this.renderAds();
            this.renderDashboard();
          }
        });
      });

      tb.querySelectorAll('.btn-edit-ad').forEach(btn => {
        btn.addEventListener('click', () => {
          this.openAdModal(btn.getAttribute('data-id'));
        });
      });

      tb.querySelectorAll('.btn-del-ad').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (confirm("¿Desea eliminar este anuncio?")) {
            const filtered = ads.filter(x => x.id !== id);
            Storage.set(STORAGE_KEYS.ADS, filtered);
            this.renderAds();
            this.renderDashboard();
          }
        });
      });
    },

    openAdModal(id = null) {
      this.currentAdId = id;
      const modal = document.getElementById('modal-ad-editor');
      const form = document.getElementById('form-ad-editor');
      const titleM = document.getElementById('ad-modal-title');
      const prev = document.getElementById('ad-image-preview');

      form.reset();
      prev.src = '';
      prev.style.display = 'none';

      const slotSelect = form.adSlot;
      slotSelect.innerHTML = AD_SLOTS.map(s => `<option value="${s.id}">${s.name}</option>`).join('');

      if (id) {
        const ads = Storage.get(STORAGE_KEYS.ADS, []);
        const item = ads.find(x => x.id === id);
        if (!item) return;

        titleM.textContent = "Editar Anuncio";
        form.adSlot.value = item.slot;
        form.adTitle.value = item.title || '';
        form.adDescription.value = item.description || '';
        form.adImageUrl.value = item.imageUrl || '';
        form.adLinkUrl.value = item.linkUrl || '';
        form.adStartDate.value = item.startDate || '';
        form.adEndDate.value = item.endDate || '';
        form.adIsActive.checked = !!item.isActive;

        if (item.imageUrl) {
          prev.src = item.imageUrl;
          prev.style.display = 'block';
        }
      } else {
        titleM.textContent = "Agregar Anuncio";
        form.adIsActive.checked = true;
      }

      modal.showModal();
    },

    // 4. CARRUSEL
    renderCarousel() {
      const tb = document.getElementById('admin-carousel-table-body');
      if (!tb) return;
      const list = Storage.get(STORAGE_KEYS.CAROUSEL, []).sort((a, b) => (a.order || 0) - (b.order || 0));

      tb.innerHTML = list.map((it, idx) => `
        <tr>
          <td><strong>#${it.order || idx + 1}</strong></td>
          <td><img src="${it.imageUrl || 'assets/images/noticia-priar.jpg'}" class="item-thumb" alt="" /></td>
          <td><strong>${it.title}</strong></td>
          <td><span class="badge-category">${it.category}</span></td>
          <td>${it.date}</td>
          <td>
            <button class="badge-status ${it.isActive ? 'active' : 'inactive'} btn-toggle-slide" data-id="${it.id}">
              ${it.isActive ? 'Activo' : 'Inactivo'}
            </button>
          </td>
          <td>
            <div class="table-actions">
              <button class="btn-icon btn-slide-up" data-id="${it.id}" ${idx === 0 ? 'disabled' : ''}>▲</button>
              <button class="btn-icon btn-slide-down" data-id="${it.id}" ${idx === list.length - 1 ? 'disabled' : ''}>▼</button>
              <button class="btn-icon btn-edit-slide" data-id="${it.id}">✏️</button>
              <button class="btn-icon danger btn-del-slide" data-id="${it.id}">🗑️</button>
            </div>
          </td>
        </tr>
      `).join('');

      tb.querySelectorAll('.btn-toggle-slide').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          const target = list.find(x => x.id === id);
          if (target) {
            target.isActive = !target.isActive;
            Storage.set(STORAGE_KEYS.CAROUSEL, list);
            this.renderCarousel();
          }
        });
      });

      tb.querySelectorAll('.btn-slide-up').forEach(btn => {
        btn.addEventListener('click', () => this.shiftSlide(btn.getAttribute('data-id'), -1));
      });

      tb.querySelectorAll('.btn-slide-down').forEach(btn => {
        btn.addEventListener('click', () => this.shiftSlide(btn.getAttribute('data-id'), 1));
      });

      tb.querySelectorAll('.btn-edit-slide').forEach(btn => {
        btn.addEventListener('click', () => this.openCarouselModal(btn.getAttribute('data-id')));
      });

      tb.querySelectorAll('.btn-del-slide').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          if (confirm("¿Eliminar esta publicación del carrusel?")) {
            const filtered = list.filter(x => x.id !== id);
            Storage.set(STORAGE_KEYS.CAROUSEL, filtered);
            this.renderCarousel();
            this.renderDashboard();
          }
        });
      });
    },

    shiftSlide(id, dir) {
      const list = Storage.get(STORAGE_KEYS.CAROUSEL, []).sort((a, b) => (a.order || 0) - (b.order || 0));
      const idx = list.findIndex(x => x.id === id);
      if (idx === -1) return;
      const targetIdx = idx + dir;
      if (targetIdx < 0 || targetIdx >= list.length) return;

      const tmp = list[idx];
      list[idx] = list[targetIdx];
      list[targetIdx] = tmp;

      list.forEach((item, i) => { item.order = i + 1; });
      Storage.set(STORAGE_KEYS.CAROUSEL, list);
      this.renderCarousel();
    },

    openCarouselModal(id = null) {
      this.currentSlideId = id;
      const modal = document.getElementById('modal-carousel-editor');
      const form = document.getElementById('form-carousel-editor');
      const titleM = document.getElementById('carousel-modal-title');
      const prev = document.getElementById('carousel-image-preview');

      form.reset();
      prev.src = '';
      prev.style.display = 'none';

      if (id) {
        const list = Storage.get(STORAGE_KEYS.CAROUSEL, []);
        const item = list.find(x => x.id === id);
        if (!item) return;

        titleM.textContent = "Editar Slide";
        form.slideTitle.value = item.title;
        form.slideCategory.value = item.category;
        form.slideDate.value = item.date;
        form.slideImageUrl.value = item.imageUrl || '';
        form.slideNewsId.value = item.newsId || '';
        form.slideOrder.value = item.order || 1;
        form.slideIsActive.checked = !!item.isActive;

        if (item.imageUrl) {
          prev.src = item.imageUrl;
          prev.style.display = 'block';
        }
      } else {
        titleM.textContent = "Agregar Slide";
        form.slideDate.value = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
        form.slideOrder.value = Storage.get(STORAGE_KEYS.CAROUSEL, []).length + 1;
        form.slideIsActive.checked = true;
      }

      modal.showModal();
    },

    // 5. CONFIGURACIÓN
    renderSettings() {
      const form = document.getElementById('form-site-settings');
      if (!form) return;
      const s = Storage.get(STORAGE_KEYS.SETTINGS, {
        newspaperName: "PERIÓDICO CULTURA",
        slogan: "DECANO DE LA PRENSA CORRENTINA",
        city: "Curuzú Cuatiá",
        province: "Corrientes, Argentina",
        instagramHandle: "@PERIODICO_CULTURA",
        facebookHandle: "@PERIODICO_CULTURA",
        email: "redaccion@periodicocultura.com.ar",
        phone: "+54 3774 42-XXXX",
        address: "Curuzú Cuatiá, Corrientes, Argentina"
      });

      form.settingNewspaperName.value = s.newspaperName || '';
      form.settingSlogan.value = s.slogan || '';
      form.settingCity.value = s.city || '';
      form.settingProvince.value = s.province || '';
      form.settingInstagram.value = s.instagramHandle || '';
      form.settingFacebook.value = s.facebookHandle || '';
      form.settingEmail.value = s.email || '';
      form.settingPhone.value = s.phone || '';
      form.settingAddress.value = s.address || '';

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const updated = {
          ...s,
          newspaperName: form.settingNewspaperName.value,
          slogan: form.settingSlogan.value,
          city: form.settingCity.value,
          province: form.settingProvince.value,
          instagramHandle: form.settingInstagram.value,
          facebookHandle: form.settingFacebook.value,
          email: form.settingEmail.value,
          phone: form.settingPhone.value,
          address: form.settingAddress.value
        };
        Storage.set(STORAGE_KEYS.SETTINGS, updated);
        alert("¡Datos institucionales actualizados!");
      });

      const resetBtn = document.getElementById('btn-reset-factory-data');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (confirm("⚠️ ¿Restablecer todos los datos originales de fábrica?")) {
            Storage.resetAll();
            alert("Sistema restablecido.");
            location.reload();
          }
        });
      }
    },

    // 6. FORMULARIOS Y CARGA DE IMÁGENES
    bindForms() {
      // Nueva noticia modal
      const btnNew = document.getElementById('btn-new-news');
      if (btnNew) btnNew.addEventListener('click', () => this.openNewsModal());

      // Archivo imagen noticia
      const newsFile = document.getElementById('news-file-input');
      const newsUrl = document.getElementById('news-image-url');
      const newsPrev = document.getElementById('news-image-preview');

      if (newsFile) {
        newsFile.addEventListener('change', (e) => {
          const f = e.target.files[0];
          if (f) {
            const r = new FileReader();
            r.onload = (ev) => {
              newsPrev.src = ev.target.result;
              newsPrev.style.display = 'block';
              newsUrl.value = ev.target.result;
            };
            r.readAsDataURL(f);
          }
        });
      }

      const formNews = document.getElementById('form-news-editor');
      if (formNews) {
        formNews.addEventListener('submit', (e) => {
          e.preventDefault();
          if (!this.isAuthenticated()) { this.lockPanel(); return; }

          const news = Storage.get(STORAGE_KEYS.NEWS, []);
          const isFeatured = formNews.newsIsFeatured.checked;

          if (isFeatured) {
            news.forEach(x => x.isFeatured = false);
          }

          const item = {
            id: this.currentNewsId || `news-${Date.now()}`,
            title: formNews.newsTitle.value.trim(),
            category: formNews.newsCategory.value.trim() || 'Curuzú Cuatiá',
            date: formNews.newsDate.value.trim(),
            time: formNews.newsTime.value.trim(),
            author: formNews.newsAuthor.value.trim(),
            summary: formNews.newsSummary.value.trim(),
            fullContent: formNews.newsContent.value.trim(),
            tags: formNews.newsTags.value.split(',').map(t => t.trim()).filter(Boolean),
            mainImage: formNews.newsImageUrl.value.trim() || 'assets/images/noticia-priar.jpg',
            isFeatured: isFeatured,
            isActive: formNews.newsIsActive.checked
          };

          let updated;
          if (this.currentNewsId) {
            updated = news.map(x => x.id === item.id ? item : x);
          } else {
            updated = [item, ...news];
          }

          Storage.set(STORAGE_KEYS.NEWS, updated);
          document.getElementById('modal-news-editor').close();
          this.renderNews();
          this.renderDashboard();
        });
      }

      // Anuncios
      const btnNewAd = document.getElementById('btn-new-ad');
      if (btnNewAd) btnNewAd.addEventListener('click', () => {
        if (!this.isAuthenticated()) { this.lockPanel(); return; }
        this.openAdModal();
      });

      const adFile = document.getElementById('ad-file-input');
      const adUrl = document.getElementById('ad-image-url');
      const adPrev = document.getElementById('ad-image-preview');

      if (adFile) {
        adFile.addEventListener('change', (e) => {
          const f = e.target.files[0];
          if (f) {
            const r = new FileReader();
            r.onload = (ev) => {
              adPrev.src = ev.target.result;
              adPrev.style.display = 'block';
              adUrl.value = ev.target.result;
            };
            r.readAsDataURL(f);
          }
        });
      }

      const formAd = document.getElementById('form-ad-editor');
      if (formAd) {
        formAd.addEventListener('submit', (e) => {
          e.preventDefault();
          if (!this.isAuthenticated()) { this.lockPanel(); return; }

          const ads = Storage.get(STORAGE_KEYS.ADS, []);
          const item = {
            id: this.currentAdId || `ad-${Date.now()}`,
            slot: formAd.adSlot.value,
            title: formAd.adTitle.value.trim(),
            description: formAd.adDescription.value.trim(),
            imageUrl: formAd.adImageUrl.value.trim(),
            linkUrl: formAd.adLinkUrl.value.trim(),
            startDate: formAd.adStartDate.value,
            endDate: formAd.adEndDate.value,
            isActive: formAd.adIsActive.checked
          };

          let updated;
          if (this.currentAdId) {
            updated = ads.map(x => x.id === item.id ? item : x);
          } else {
            updated = [...ads, item];
          }

          Storage.set(STORAGE_KEYS.ADS, updated);
          document.getElementById('modal-ad-editor').close();
          this.renderAds();
          this.renderDashboard();
        });
      }

      // Carrusel
      const btnNewSlide = document.getElementById('btn-new-slide');
      if (btnNewSlide) btnNewSlide.addEventListener('click', () => {
        if (!this.isAuthenticated()) { this.lockPanel(); return; }
        this.openCarouselModal();
      });

      const formSlide = document.getElementById('form-carousel-editor');
      if (formSlide) {
        formSlide.addEventListener('submit', (e) => {
          e.preventDefault();
          if (!this.isAuthenticated()) { this.lockPanel(); return; }

          const slides = Storage.get(STORAGE_KEYS.CAROUSEL, []);
          const item = {
            id: this.currentSlideId || `slide-${Date.now()}`,
            title: formSlide.slideTitle.value.trim(),
            category: formSlide.slideCategory.value.trim(),
            date: formSlide.slideDate.value.trim(),
            imageUrl: formSlide.slideImageUrl.value.trim() || 'assets/images/noticia-priar.jpg',
            newsId: formSlide.slideNewsId.value.trim(),
            order: parseInt(formSlide.slideOrder.value, 10) || 1,
            isActive: formSlide.slideIsActive.checked
          };

          let updated;
          if (this.currentSlideId) {
            updated = slides.map(x => x.id === item.id ? item : x);
          } else {
            updated = [...slides, item];
          }

          Storage.set(STORAGE_KEYS.CAROUSEL, updated);
          document.getElementById('modal-carousel-editor').close();
          this.renderCarousel();
          this.renderDashboard();
        });
      }

      // Cerrar modales
      document.querySelectorAll('.btn-close-modal').forEach(b => {
        b.addEventListener('click', (e) => {
          const d = e.target.closest('dialog');
          if (d) d.close();
        });
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AdminApp.init());
  } else {
    AdminApp.init();
  }
})();
