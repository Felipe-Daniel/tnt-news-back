import cors from 'cors';
import express from 'express';
import { authRouter } from './routes/auth.js';
import { newsRouter } from './routes/news.js';

function normalizeOrigin(origin: string) {
  return origin.trim().replace(/\/$/, '');
}

function getAllowedOrigins() {
  return (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean);
}

export function createApp() {
  const app = express();

  const allowedOrigins = getAllowedOrigins();

  app.use(
    cors({
      origin(origin, callback) {
        // Allow non-browser clients (curl, health checks)
        if (!origin) {
          callback(null, true);
          return;
        }

        const normalized = normalizeOrigin(origin);
        if (allowedOrigins.includes(normalized)) {
          callback(null, true);
          return;
        }

        console.warn(`CORS blocked origin: ${origin}. Allowed: ${allowedOrigins.join(', ')}`);
        callback(null, false);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/auth', authRouter);
  app.use('/news', newsRouter);

  return app;
}
