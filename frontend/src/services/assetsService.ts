import api from './api';

export const assetsService = {
  getStyles: () =>
    api.get('/assets/styles'),

  getTemplates: (category?: string) =>
    api.get('/assets/templates', { params: { category } }),

  getBackgrounds: (query?: string, limit?: number) =>
    api.get('/assets/backgrounds', { params: { query, limit } }),

  getSoundEffects: (category?: string, limit?: number) =>
    api.get('/assets/sfx', { params: { category, limit } }),

  getMusic: (mood?: string, genre?: string, limit?: number) =>
    api.get('/assets/music', { params: { mood, genre, limit } }),
};
