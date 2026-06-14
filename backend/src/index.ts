import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import dotenv from 'dotenv';
import { logger } from './utils/logger';
import { errorHandler } from './middlewares/errorHandler';
import { healthCheckRouter } from './routes/health';
import { authRouter } from './routes/auth';
import { videosRouter } from './routes/videos';
import { projectsRouter } from './routes/projects';
import { assetsRouter } from './routes/assets';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/health', healthCheckRouter);
app.use('/api/auth', authRouter);
app.use('/api/videos', videosRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/assets', assetsRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AI Video Generation API',
    version: '1.0.0',
    status: 'running',
    environment: NODE_ENV,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'NOT_FOUND',
    message: 'Route not found',
  });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT} in ${NODE_ENV} mode`);
});

export default app;
