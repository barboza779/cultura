/**
 * PERIÓDICO CULTURA - SERVICIO DE NOTICIAS (NEWS SERVICE)
 * Maneja operaciones lógicas y consultas de artículos de noticias.
 */

import { StorageService } from './storageService.js';

export const NewsService = {
  // Obtener todas las noticias (activas o todas si es admin)
  getAll(includeInactive = false) {
    const all = StorageService.getNews();
    if (includeInactive) return all;
    return all.filter(n => n.isActive);
  },

  // Obtener la noticia principal (isFeatured: true y activa)
  getFeatured() {
    const all = this.getAll(false);
    const featured = all.find(n => n.isFeatured);
    // Si no hay ninguna explícitamente marcada, retorna la primera disponible
    return featured || all[0] || null;
  },

  // Obtener noticias por categoría
  getByCategory(category, includeInactive = false) {
    const all = this.getAll(includeInactive);
    if (!category || category === 'TODAS') return all;
    return all.filter(n => n.category.toUpperCase() === category.toUpperCase());
  },

  // Obtener una noticia por su ID
  getById(id) {
    const all = StorageService.getNews();
    return all.find(n => n.id === id) || null;
  },

  // Guardar (crear o actualizar) noticia
  save(newsItem) {
    const all = StorageService.getNews();
    const isNew = !newsItem.id;
    const finalItem = {
      ...newsItem,
      id: newsItem.id || `news-${Date.now()}`,
      slug: newsItem.slug || this.generateSlug(newsItem.title),
      updatedAt: new Date().toISOString()
    };

    let updatedList;
    if (isNew) {
      finalItem.createdAt = new Date().toISOString();
      finalItem.views = 0;
      // Si se marca como principal, desmarcar las otras
      if (finalItem.isFeatured) {
        all.forEach(n => n.isFeatured = false);
      }
      updatedList = [finalItem, ...all];
    } else {
      if (finalItem.isFeatured) {
        all.forEach(n => {
          if (n.id !== finalItem.id) n.isFeatured = false;
        });
      }
      updatedList = all.map(n => n.id === finalItem.id ? finalItem : n);
    }

    StorageService.saveNews(updatedList);
    return finalItem;
  },

  // Marcar como noticia principal
  setFeatured(id) {
    const all = StorageService.getNews();
    const target = all.find(n => n.id === id);
    if (!target) return false;

    all.forEach(n => {
      n.isFeatured = (n.id === id);
    });

    StorageService.saveNews(all);
    return true;
  },

  // Cambiar estado activo / inactivo
  toggleStatus(id) {
    const all = StorageService.getNews();
    const item = all.find(n => n.id === id);
    if (!item) return false;

    item.isActive = !item.isActive;
    StorageService.saveNews(all);
    return item.isActive;
  },

  // Eliminar noticia
  delete(id) {
    const all = StorageService.getNews();
    const filtered = all.filter(n => n.id !== id);
    
    // Si la noticia eliminada era la principal y quedan noticias, marcar la primera
    if (all.find(n => n.id === id)?.isFeatured && filtered.length > 0) {
      filtered[0].isFeatured = true;
    }

    StorageService.saveNews(filtered);
    return true;
  },

  // Incrementar vistas de lectura
  incrementViews(id) {
    const all = StorageService.getNews();
    const item = all.find(n => n.id === id);
    if (item) {
      item.views = (item.views || 0) + 1;
      StorageService.saveNews(all);
    }
  },

  generateSlug(title) {
    return (title || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 80);
  }
};
