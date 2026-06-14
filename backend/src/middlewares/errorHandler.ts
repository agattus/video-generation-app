import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';
  const message = err.message || 'Internal server error';

  logger.error({
    error: err,
    statusCode,
    code,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json({
    success: false,
    error: code,
    message,
  });
};
