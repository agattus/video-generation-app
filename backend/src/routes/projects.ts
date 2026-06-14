import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../middlewares/auth';
import { logger } from '../utils/logger';

export const projectsRouter = Router();

// Mock projects database
const projects: Map<string, any> = new Map();

// POST - Create project
projectsRouter.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { title, description, settings } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_INPUT',
        message: 'Title is required',
      });
    }

    const projectId = `project_${Date.now()}`;
    const projectData = {
      id: projectId,
      userId: req.user?.id,
      title,
      description: description || '',
      settings: settings || {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    projects.set(projectId, projectData);

    logger.info({ projectId, userId: req.user?.id }, 'Project created');

    res.status(201).json({
      success: true,
      data: projectData,
      message: 'Project created successfully',
    });
  } catch (error) {
    logger.error({ error });
    res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'Failed to create project',
    });
  }
});

// GET - List projects
projectsRouter.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userProjects = Array.from(projects.values()).filter(
      (p) => p.userId === req.user?.id
    );

    res.json({
      success: true,
      data: {
        projects: userProjects,
        pagination: {
          total: userProjects.length,
          page: 1,
          limit: 20,
        },
      },
      message: 'Projects retrieved successfully',
    });
  } catch (error) {
    logger.error({ error });
    res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'Failed to retrieve projects',
    });
  }
});

// GET - Get project by ID
projectsRouter.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const project = projects.get(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'NOT_FOUND',
        message: 'Project not found',
      });
    }

    if (project.userId !== req.user?.id) {
      return res.status(403).json({
        success: false,
        error: 'FORBIDDEN',
        message: 'Access denied',
      });
    }

    res.json({
      success: true,
      data: project,
      message: 'Project retrieved successfully',
    });
  } catch (error) {
    logger.error({ error });
    res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'Failed to retrieve project',
    });
  }
});

// PUT - Update project
projectsRouter.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const project = projects.get(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'NOT_FOUND',
        message: 'Project not found',
      });
    }

    if (project.userId !== req.user?.id) {
      return res.status(403).json({
        success: false,
        error: 'FORBIDDEN',
        message: 'Access denied',
      });
    }

    const updatedProject = {
      ...project,
      ...req.body,
      updatedAt: new Date().toISOString(),
    };

    projects.set(req.params.id, updatedProject);

    res.json({
      success: true,
      data: updatedProject,
      message: 'Project updated successfully',
    });
  } catch (error) {
    logger.error({ error });
    res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'Failed to update project',
    });
  }
});
