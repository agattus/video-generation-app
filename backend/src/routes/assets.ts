import { Router } from 'express';
import { logger } from '../utils/logger';

export const assetsRouter = Router();

// Mock data for styles
const styles = [
  {
    id: 'cinematic',
    name: 'Cinematic',
    description: 'Professional cinematic look with advanced color grading',
    category: 'professional',
    preview: '/previews/cinematic.jpg',
  },
  {
    id: 'disney_pixar',
    name: 'Disney/Pixar',
    description: '3D animation style inspired by Disney and Pixar',
    category: 'animation',
    preview: '/previews/disney_pixar.jpg',
  },
  {
    id: 'photorealistic',
    name: 'Photorealistic',
    description: 'High-quality photorealistic rendering',
    category: 'realism',
    preview: '/previews/photorealistic.jpg',
  },
  {
    id: 'anime',
    name: 'Anime',
    description: 'Japanese animation style with cel-shading',
    category: 'animation',
    preview: '/previews/anime.jpg',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean, simple design with minimal elements',
    category: 'modern',
    preview: '/previews/minimalist.jpg',
  },
  {
    id: 'retro',
    name: 'Retro/Vintage',
    description: '80s/90s nostalgic aesthetic',
    category: 'vintage',
    preview: '/previews/retro.jpg',
  },
  {
    id: 'abstract',
    name: 'Abstract',
    description: 'Artistic and creative surreal visuals',
    category: 'artistic',
    preview: '/previews/abstract.jpg',
  },
];

// GET - List styles
assetsRouter.get('/styles', (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        styles,
      },
      message: 'Styles retrieved successfully',
    });
  } catch (error) {
    logger.error({ error });
    res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'Failed to retrieve styles',
    });
  }
});

// GET - List templates
assetsRouter.get('/templates', (req, res) => {
  try {
    const templates = [
      {
        id: 'marketing_intro',
        name: 'Marketing Intro',
        category: 'marketing',
        duration: 15,
        description: 'Professional product marketing intro',
      },
      {
        id: 'educational',
        name: 'Educational',
        category: 'education',
        duration: 300,
        description: 'Tutorial and educational content template',
      },
      {
        id: 'music_video',
        name: 'Music Video',
        category: 'music',
        duration: 180,
        description: 'Dynamic music video template',
      },
    ];

    res.json({
      success: true,
      data: {
        templates,
      },
      message: 'Templates retrieved successfully',
    });
  } catch (error) {
    logger.error({ error });
    res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'Failed to retrieve templates',
    });
  }
});

// GET - Search backgrounds
assetsRouter.get('/backgrounds', (req, res) => {
  try {
    const query = req.query.query as string || '';
    const limit = parseInt(req.query.limit as string) || 20;

    const backgrounds = [
      { id: 'bg_001', name: 'Sunset', category: 'nature', url: '/backgrounds/sunset.jpg' },
      { id: 'bg_002', name: 'Ocean', category: 'nature', url: '/backgrounds/ocean.jpg' },
      { id: 'bg_003', name: 'City', category: 'urban', url: '/backgrounds/city.jpg' },
      { id: 'bg_004', name: 'Forest', category: 'nature', url: '/backgrounds/forest.jpg' },
    ];

    const filtered = backgrounds
      .filter((bg) => bg.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, limit);

    res.json({
      success: true,
      data: {
        backgrounds: filtered,
      },
      message: 'Backgrounds retrieved successfully',
    });
  } catch (error) {
    logger.error({ error });
    res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'Failed to retrieve backgrounds',
    });
  }
});
