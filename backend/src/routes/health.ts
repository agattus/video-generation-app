import { Router, Request, Response } from 'express';

export const healthCheckRouter = Router();

healthCheckRouter.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
