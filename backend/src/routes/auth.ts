import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { logger } from '../utils/logger';

export const authRouter = Router();

// Mock user database - replace with real DB
const users: Map<string, any> = new Map();

// Register
authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_INPUT',
        message: 'Email, password, and username are required',
      });
    }

    if (users.has(email)) {
      return res.status(409).json({
        success: false,
        error: 'CONFLICT',
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `user_${Date.now()}`;

    users.set(email, {
      id: userId,
      email,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: userId, email, username },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    const refreshToken = jwt.sign(
      { id: userId, email, username },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      data: {
        id: userId,
        email,
        username,
        token,
        refreshToken,
      },
      message: 'User registered successfully',
    });
  } catch (error) {
    logger.error({ error });
    res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'Registration failed',
    });
  }
});

// Login
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_INPUT',
        message: 'Email and password are required',
      });
    }

    const user = users.get(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Invalid credentials',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'UNAUTHORIZED',
        message: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        username: user.username,
        token,
        refreshToken,
      },
      message: 'Login successful',
    });
  } catch (error) {
    logger.error({ error });
    res.status(500).json({
      success: false,
      error: 'INTERNAL_ERROR',
      message: 'Login failed',
    });
  }
});
