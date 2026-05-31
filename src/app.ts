import cors from 'cors';
import express from 'express';
import { authRouter } from './routes/auth.js';
import { newsRouter } from './routes/news.js';

export function createApp() {
  const app = express();

  const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

  app.use(
    cors({
      origin: corsOrigin.split(',').map((origin) => origin.trim()),
      credentials: true,
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
