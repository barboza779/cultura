/**
 * PERIÓDICO CULTURA - CONTROLADOR DEL PANEL DE AUTOGESTIÓN (ADMIN.JS)
 * Panel intuitivo para gestionar Noticias, Publicidad, Carrusel y Configuración.
 */

import { StorageService } from './services/storageService.js';
import { NewsService } from './services/newsService.js';
import { AdsService, AD_SLOTS } from './services/adsService.js';

document.addEventListener('DOMContentLoaded', () => {
  AdminApp.init();
});

const AdminApp = {
  activeTab: 'dashboard',
  currentNewsEditingId: null,
  currentAdEditingId: null,
  currentCarouselEditingId: null,

  init() {
    this.initNavigation();
    this.renderDashboard();
    this.renderNewsTable();
    this.renderAdsTable();
    this.renderCarouselTable();
    this.renderSettingsForm();
    this.bindModalsAndForms();
  },

  // Manejo de pestañas del panel
  initNavigation() {
    const navItems = document.querySelectorAll('.admin-nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.getAttribute('data-tab');
        if (!tab) return;

        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        document.querySelectorAll('.admin-tab-pane').forEach(pane => {
          pane.classList.remove('active');
        });

        const activePane = document.getElementById(`tab-${tab}`);
        if (activePane) {
          activePane.classList.add('active');
        }

        this.activeTab = tab;

        if (tab === 'dashboard') this.renderDashboard();
        if (tab === 'noticias') this.renderNewsTable();
        if (tab === 'publicidad') this.renderAdsTable();
        if (tab === 'carrusel') this.renderCarouselTable();
      });
    });
  },

  // ------------------------------------------------------------------------
  // 1. DASHBOARD
  // ------------------------------------------------------------------------
  renderDashboard() {
    const allNews = NewsService.getAll(true);
    const featured = NewsService.getFeatured();
    const allAds = AdsService.getAll(true);
    const activeAds = allAds.filter(a => a.isActive);
    const carouselItems = StorageService.getCarousel();

    const countNewsEl = document.getElementById('metric-total-news');
    const featuredTitleEl = document.getElementById('metric-featured-title');
    const countAdsEl = document.getElementById('metric-active-ads');
    const countCarouselEl = document.getElementById('metric-carousel-slides');

    if (countNewsEl) countNewsEl.textContent = allNews.length;
    if (featuredTitleEl) {
      featuredTitleEl.textContent = featured ? featured.title.substring(0, 48) + '...' : 'Sin asignar';
    }
    if (countAdsEl) countAdsEl.textContent = `${activeAds.length} / ${allAds.length}`;
    if (countCarouselEl) countCarouselEl.textContent = carouselItems.length;

    // Renderizar últimas noticias en la tarjeta de resumen del dashboard
    const recentTable = document.getElementById('dashboard-recent-news');
    if (recentTable) {
      const recent = allNews.slice(0, 4);
      recentTable.innerHTML = recent.map(n => `
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

  // ------------------------------------------------------------------------
  // 2. GESTOR DE NOTICIAS
  // ------------------------------------------------------------------------
  renderNewsTable() {
    const tableBody = document.getElementById('admin-news-table-body');
    if (!tableBody) return;

    const newsList = NewsService.getAll(true);

    if (newsList.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2rem;">No hay noticias creadas.</td></tr>`;
      return;
    }

    tableBody.innerHTML = newsList.map(news => `
      <tr>
        <td>
          <img src="${news.mainImage || 'assets/images/noticia-priar.jpg'}" class="item-thumb" alt="" />
        </td>
        <td style="max-width: 320px;">
          <strong>${news.title}</strong>
          <div style="font-size: 0.775rem; color: var(--color-gray-500); margin-top: 3px;">
            Por: ${news.author || 'Redacción'} • ${news.time || ''}
          </div>
        </td>
        <td>
          <span class="badge-category">${news.category}</span>
        </td>
        <td style="white-space: nowrap; font-size: 0.8rem;">
          ${news.date}
        </td>
        <td>
          ${news.isFeatured 
            ? '<span class="badge-principal">★ Principal</span>' 
            : `<button class="btn-icon star btn-make-featured" data-id="${news.id}" title="Marcar como Principal">☆</button>`
          }
        </td>
        <td>
          <button class="badge-status ${news.isActive ? 'active' : 'inactive'} btn-toggle-news-status" data-id="${news.id}">
            ${news.isActive ? 'Activa' : 'Inactiva'}
          </button>
        </td>
        <td>
          <div class="table-actions">
            <button class="btn-icon btn-edit-news" data-id="${news.id}" title="Editar noticia">✏️</button>
            <button class="btn-icon danger btn-delete-news" data-id="${news.id}" title="Eliminar noticia">🗑️</button>
          </div>
        </td>
      </tr>
    `).join('');

    // Eventos de la tabla de noticias
    tableBody.querySelectorAll('.btn-make-featured').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        NewsService.setFeatured(id);
        this.renderNewsTable();
        this.renderDashboard();
      });
    });

    tableBody.querySelectorAll('.btn-toggle-news-status').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        NewsService.toggleStatus(id);
        this.renderNewsTable();
        this.renderDashboard();
      });
    });

    tableBody.querySelectorAll('.btn-edit-news').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.openNewsModal(id);
      });
    });

    tableBody.querySelectorAll('.btn-delete-news').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm("¿Está seguro de que desea eliminar esta noticia? Esta acción no se puede deshacer.")) {
          NewsService.delete(id);
          this.renderNewsTable();
          this.renderDashboard();
        }
      });
    });
  },

  openNewsModal(newsId = null) {
    this.currentNewsEditingId = newsId;
    const modal = document.getElementById('modal-news-editor');
    const form = document.getElementById('form-news-editor');
    const titleModal = document.getElementById('news-modal-title');
    const imgPreview = document.getElementById('news-image-preview');

    form.reset();
    imgPreview.src = '';
    imgPreview.style.display = 'none';

    if (newsId) {
      const item = NewsService.getById(newsId);
      if (!item) return;

      titleModal.textContent = "Editar Noticia";
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
        imgPreview.src = item.mainImage;
        imgPreview.style.display = 'block';
      }
    } else {
      titleModal.textContent = "Agregar Nueva Noticia";
      // Valores por defecto
      form.newsDate.value = new Date().toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' });
      form.newsTime.value = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + ' hs';
      form.newsAuthor.value = "Redacción Periódico Cultura";
      form.newsIsActive.checked = true;
    }

    modal.showModal();
  },

  // ------------------------------------------------------------------------
  // 3. GESTOR DE PUBLICIDAD
  // ------------------------------------------------------------------------
  renderAdsTable() {
    const tableBody = document.getElementById('admin-ads-table-body');
    if (!tableBody) return;

    const adsList = AdsService.getAll(true);

    tableBody.innerHTML = adsList.map(ad => {
      const slotObj = AD_SLOTS.find(s => s.id === ad.slot);
      const slotName = slotObj ? slotObj.name : ad.slot;

      return `
        <tr>
          <td>
            <strong>${slotName}</strong>
            <div style="font-size: 0.75rem; color: var(--color-gray-500);">${ad.slot}</div>
          </td>
          <td>
            <strong>${ad.title || 'Sin título'}</strong>
            <div style="font-size: 0.775rem; color: var(--color-gray-600); max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${ad.description || ''}
            </div>
          </td>
          <td>
            ${ad.imageUrl 
              ? `<img src="${ad.imageUrl}" class="item-thumb" alt="" />`
              : `<span style="font-size: 0.75rem; color: var(--color-gray-500);">Placeholder de venta</span>`
            }
          </td>
          <td>
            <a href="${ad.linkUrl || '#'}" target="_blank" style="font-size: 0.8rem; color: var(--color-primary); max-width: 150px; display: inline-block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              ${ad.linkUrl || 'N/A'}
            </a>
          </td>
          <td style="font-size: 0.8rem;">
            ${ad.startDate || 'Inmediato'} a ${ad.endDate || 'Indefinido'}
          </td>
          <td>
            <button class="badge-status ${ad.isActive ? 'active' : 'inactive'} btn-toggle-ad-status" data-id="${ad.id}">
              ${ad.isActive ? 'Activo' : 'Inactivo'}
            </button>
          </td>
          <td>
            <div class="table-actions">
              <button class="btn-icon btn-edit-ad" data-id="${ad.id}" title="Editar anuncio">✏️</button>
              <button class="btn-icon danger btn-delete-ad" data-id="${ad.id}" title="Eliminar anuncio">🗑️</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    tableBody.querySelectorAll('.btn-toggle-ad-status').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        AdsService.toggleStatus(id);
        this.renderAdsTable();
        this.renderDashboard();
      });
    });

    tableBody.querySelectorAll('.btn-edit-ad').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.openAdModal(id);
      });
    });

    tableBody.querySelectorAll('.btn-delete-ad').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm("¿Desea eliminar este espacio de anuncio?")) {
          AdsService.delete(id);
          this.renderAdsTable();
          this.renderDashboard();
        }
      });
    });
  },

  openAdModal(adId = null) {
    this.currentAdEditingId = adId;
    const modal = document.getElementById('modal-ad-editor');
    const form = document.getElementById('form-ad-editor');
    const titleModal = document.getElementById('ad-modal-title');
    const imgPreview = document.getElementById('ad-image-preview');

    form.reset();
    imgPreview.src = '';
    imgPreview.style.display = 'none';

    // Rellenar selector de slots
    const slotSelect = form.adSlot;
    slotSelect.innerHTML = AD_SLOTS.map(s => `<option value="${s.id}">${s.name}</option>`).join('');

    if (adId) {
      const item = AdsService.getById(adId);
      if (!item) return;

      titleModal.textContent = "Editar Anuncio";
      form.adSlot.value = item.slot;
      form.adTitle.value = item.title || '';
      form.adDescription.value = item.description || '';
      form.adImageUrl.value = item.imageUrl || '';
      form.adLinkUrl.value = item.linkUrl || '';
      form.adStartDate.value = item.startDate || '';
      form.adEndDate.value = item.endDate || '';
      form.adIsActive.checked = !!item.isActive;

      if (item.imageUrl) {
        imgPreview.src = item.imageUrl;
        imgPreview.style.display = 'block';
      }
    } else {
      titleModal.textContent = "Agregar Anuncio";
      form.adIsActive.checked = true;
    }

    modal.showModal();
  },

  // ------------------------------------------------------------------------
  // 4. GESTOR DE CARRUSEL
  // ------------------------------------------------------------------------
  renderCarouselTable() {
    const tableBody = document.getElementById('admin-carousel-table-body');
    if (!tableBody) return;

    const list = StorageService.getCarousel().sort((a, b) => (a.order || 0) - (b.order || 0));

    tableBody.innerHTML = list.map((item, index) => `
      <tr>
        <td><strong>#${item.order || index + 1}</strong></td>
        <td><img src="${item.imageUrl || 'assets/images/noticia-priar.jpg'}" class="item-thumb" alt="" /></td>
        <td><strong>${item.title}</strong></td>
        <td><span class="badge-category">${item.category}</span></td>
        <td>${item.date}</td>
        <td>
          <button class="badge-status ${item.isActive ? 'active' : 'inactive'} btn-toggle-carousel-status" data-id="${item.id}">
            ${item.isActive ? 'Activo' : 'Inactivo'}
          </button>
        </td>
        <td>
          <div class="table-actions">
            <button class="btn-icon btn-carousel-up" data-id="${item.id}" title="Mover arriba" ${index === 0 ? 'disabled' : ''}>▲</button>
            <button class="btn-icon btn-carousel-down" data-id="${item.id}" title="Mover abajo" ${index === list.length - 1 ? 'disabled' : ''}>▼</button>
            <button class="btn-icon btn-edit-carousel" data-id="${item.id}" title="Editar">✏️</button>
            <button class="btn-icon danger btn-delete-carousel" data-id="${item.id}" title="Eliminar">🗑️</button>
          </div>
        </td>
      </tr>
    `).join('');

    tableBody.querySelectorAll('.btn-toggle-carousel-status').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const items = StorageService.getCarousel();
        const target = items.find(i => i.id === id);
        if (target) {
          target.isActive = !target.isActive;
          StorageService.saveCarousel(items);
          this.renderCarouselTable();
        }
      });
    });

    tableBody.querySelectorAll('.btn-carousel-up').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.moveCarouselOrder(id, -1);
      });
    });

    tableBody.querySelectorAll('.btn-carousel-down').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.moveCarouselOrder(id, 1);
      });
    });

    tableBody.querySelectorAll('.btn-edit-carousel').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        this.openCarouselModal(id);
      });
    });

    tableBody.querySelectorAll('.btn-delete-carousel').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm("¿Eliminar este slide del carrusel?")) {
          const items = StorageService.getCarousel().filter(i => i.id !== id);
          StorageService.saveCarousel(items);
          this.renderCarouselTable();
          this.renderDashboard();
        }
      });
    });
  },

  moveCarouselOrder(id, direction) {
    const list = StorageService.getCarousel().sort((a, b) => (a.order || 0) - (b.order || 0));
    const index = list.findIndex(i => i.id === id);
    if (index === -1) return;
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    // Actualizar órdenes
    list.forEach((item, i) => { item.order = i + 1; });
    StorageService.saveCarousel(list);
    this.renderCarouselTable();
  },

  openCarouselModal(slideId = null) {
    this.currentCarouselEditingId = slideId;
    const modal = document.getElementById('modal-carousel-editor');
    const form = document.getElementById('form-carousel-editor');
    const titleModal = document.getElementById('carousel-modal-title');
    const imgPreview = document.getElementById('carousel-image-preview');

    form.reset();
    imgPreview.src = '';
    imgPreview.style.display = 'none';

    if (slideId) {
      const items = StorageService.getCarousel();
      const item = items.find(i => i.id === slideId);
      if (!item) return;

      titleModal.textContent = "Editar Slide de Carrusel";
      form.slideTitle.value = item.title;
      form.slideCategory.value = item.category;
      form.slideDate.value = item.date;
      form.slideImageUrl.value = item.imageUrl || '';
      form.slideNewsId.value = item.newsId || '';
      form.slideOrder.value = item.order || 1;
      form.slideIsActive.checked = !!item.isActive;

      if (item.imageUrl) {
        imgPreview.src = item.imageUrl;
        imgPreview.style.display = 'block';
      }
    } else {
      titleModal.textContent = "Agregar Slide de Carrusel";
      form.slideDate.value = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'short' });
      form.slideOrder.value = StorageService.getCarousel().length + 1;
      form.slideIsActive.checked = true;
    }

    modal.showModal();
  },

  // ------------------------------------------------------------------------
  // 5. CONFIGURACIÓN Y VISTA PREVIA
  // ------------------------------------------------------------------------
  renderSettingsForm() {
    const form = document.getElementById('form-site-settings');
    if (!form) return;

    const s = StorageService.getSettings();
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
      StorageService.saveSettings(updated);
      alert("¡Configuración institucional guardada correctamente!");
    });

    const resetBtn = document.getElementById('btn-reset-factory-data');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm("⚠️ ¿ADVERTENCIA: Desea reiniciar todos los datos a los valores originales predeterminados (incluyendo la noticia oficial del PRIAR)?")) {
          StorageService.resetAll();
          alert("Datos restablecidos con éxito.");
          location.reload();
        }
      });
    }
  },

  // ------------------------------------------------------------------------
  // VINCULACIÓN DE FORMULARIOS Y CARGA DE IMÁGENES LOCALES (BASE64)
  // ------------------------------------------------------------------------
  bindModalsAndForms() {
    // 1. Noticia
    const btnNewNews = document.getElementById('btn-new-news');
    if (btnNewNews) btnNewNews.addEventListener('click', () => this.openNewsModal());

    const newsFileInput = document.getElementById('news-file-input');
    const newsImgPreview = document.getElementById('news-image-preview');
    const newsUrlInput = document.getElementById('news-image-url');

    if (newsFileInput) {
      newsFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (loadEvt) => {
            const base64 = loadEvt.target.result;
            newsImgPreview.src = base64;
            newsImgPreview.style.display = 'block';
            newsUrlInput.value = base64;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (newsUrlInput) {
      newsUrlInput.addEventListener('input', (e) => {
        if (e.target.value) {
          newsImgPreview.src = e.target.value;
          newsImgPreview.style.display = 'block';
        }
      });
    }

    const formNews = document.getElementById('form-news-editor');
    if (formNews) {
      formNews.addEventListener('submit', (e) => {
        e.preventDefault();
        const newsData = {
          id: this.currentNewsEditingId,
          title: formNews.newsTitle.value.trim(),
          category: formNews.newsCategory.value.trim() || 'Curuzú Cuatiá',
          date: formNews.newsDate.value.trim(),
          time: formNews.newsTime.value.trim(),
          author: formNews.newsAuthor.value.trim(),
          summary: formNews.newsSummary.value.trim(),
          fullContent: formNews.newsContent.value.trim(),
          tags: formNews.newsTags.value.split(',').map(t => t.trim()).filter(Boolean),
          mainImage: formNews.newsImageUrl.value.trim() || 'assets/images/noticia-priar.jpg',
          isFeatured: formNews.newsIsFeatured.checked,
          isActive: formNews.newsIsActive.checked
        };

        NewsService.save(newsData);
        document.getElementById('modal-news-editor').close();
        this.renderNewsTable();
        this.renderDashboard();
      });
    }

    // 2. Anuncio
    const btnNewAd = document.getElementById('btn-new-ad');
    if (btnNewAd) btnNewAd.addEventListener('click', () => this.openAdModal());

    const adFileInput = document.getElementById('ad-file-input');
    const adImgPreview = document.getElementById('ad-image-preview');
    const adUrlInput = document.getElementById('ad-image-url');

    if (adFileInput) {
      adFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (loadEvt) => {
            const base64 = loadEvt.target.result;
            adImgPreview.src = base64;
            adImgPreview.style.display = 'block';
            adUrlInput.value = base64;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    const formAd = document.getElementById('form-ad-editor');
    if (formAd) {
      formAd.addEventListener('submit', (e) => {
        e.preventDefault();
        const adData = {
          id: this.currentAdEditingId,
          slot: formAd.adSlot.value,
          title: formAd.adTitle.value.trim(),
          description: formAd.adDescription.value.trim(),
          imageUrl: formAd.adImageUrl.value.trim(),
          linkUrl: formAd.adLinkUrl.value.trim(),
          startDate: formAd.adStartDate.value,
          endDate: formAd.adEndDate.value,
          isActive: formAd.adIsActive.checked
        };

        AdsService.save(adData);
        document.getElementById('modal-ad-editor').close();
        this.renderAdsTable();
        this.renderDashboard();
      });
    }

    // 3. Carrusel
    const btnNewSlide = document.getElementById('btn-new-slide');
    if (btnNewSlide) btnNewSlide.addEventListener('click', () => this.openCarouselModal());

    const formCarousel = document.getElementById('form-carousel-editor');
    if (formCarousel) {
      formCarousel.addEventListener('submit', (e) => {
        e.preventDefault();
        const items = StorageService.getCarousel();
        const slideData = {
          id: this.currentCarouselEditingId || `slide-${Date.now()}`,
          title: formCarousel.slideTitle.value.trim(),
          category: formCarousel.slideCategory.value.trim(),
          date: formCarousel.slideDate.value.trim(),
          imageUrl: formCarousel.slideImageUrl.value.trim() || 'assets/images/noticia-priar.jpg',
          newsId: formCarousel.slideNewsId.value.trim(),
          order: parseInt(formCarousel.slideOrder.value, 10) || 1,
          isActive: formCarousel.slideIsActive.checked
        };

        let updated;
        if (this.currentCarouselEditingId) {
          updated = items.map(i => i.id === slideData.id ? slideData : i);
        } else {
          updated = [...items, slideData];
        }

        StorageService.saveCarousel(updated);
        document.getElementById('modal-carousel-editor').close();
        this.renderCarouselTable();
        this.renderDashboard();
      });
    }

    // Botones de cancelar en modales
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dialog = e.target.closest('dialog');
        if (dialog) dialog.close();
      });
    });
  }
};
