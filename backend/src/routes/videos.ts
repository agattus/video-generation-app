import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../middlewares/auth';
import { logger } from '../utils/logger';

export const videosRouter = Router();

// Mock videos database
const videos: Map<string, any> = new Map();

// POST - Generate video
videosRouter.post('/generate', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { projectId, title, inputType, style, aspectRatio, audio, script, options } = req.body;

    if (!projectId || !title || !inputType || !style || !aspectRatio) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_INPUT',
        message: 'Missing required fields',
      });
    }

    if (inputType === 'audio' && !audio) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_INPUT',
        message: 'Audio file is required for audio input',
      });
    }

    if (inputType === 'text' && !script) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_INPUT',
        message: 'Script is required for text input',
      });
    }

    const videoId = `video_${Date.now()}`;
    const videoData = {
      id: videoId,
      userId: req.user?.id,
      projectId,
      title,
      inputType,
      style,
      aspectRatio,
      status: 'processing',
      progress: 0,
      estimatedTime: 120,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    videos.set(videoId, videoData);

    logger.info({ videoId, userId: req.user?.id }, 'Video generation started');

    res.status(201).json({
      success: true,
      data: videoData,
      message: 'Video generation started',
    });
  } catch (error) {
    logger.error({ error });
    res.status(500).json({
      success: false,
      error: 'PROCESSING_ERROR',
      message: 'Failed to start video generation',
    });
  }
});

// GET - List videos
videosRouter.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userVideos = Array.from(videos.values()).filter(
      (v) => v.userId === req.user?.id
    );

    res.json({
      success: true,
      data: {
        videos: userVideos,
        pagination: {
          total: userVideos.length,
          page: 1,
          limit: 20,
        },
      },
      message: 'Videos retrieved successfully',
    });
  } catch (error) {
    logger.error({ error });
    res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'Failed to retrieve videos',
    });
  }
});

// GET - Get video by ID
videosRouter.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const video = videos.get(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'NOT_FOUND',
        message: 'Video not found',
      });
    }

    if (video.userId !== req.user?.id) {
      return res.status(403).json({
        success: false,
        error: 'FORBIDDEN',
        message: 'Access denied',
      });
    }

    res.json({
      success: true,
      data: video,
      message: 'Video retrieved successfully',
    });
  } catch (error) {
    logger.error({ error });
    res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'Failed to retrieve video',
    });
  }
});

// GET - Video status
videosRouter.get('/:id/status', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const video = videos.get(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        error: 'NOT_FOUND',
        message: 'Video not found',
      });
    }

    res.json({
      success: true,
      data: {
        id: video.id,
        status: video.status,
        progress: video.progress,
        currentStep: 'Processing...',
        estimatedTimeRemaining: video.estimatedTime - (video.progress * 1.2),
      },
      message: 'Status retrieved successfully',
    });
  } catch (error) {
    logger.error({ error });
    res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'Failed to retrieve status',
    });
  }
});
