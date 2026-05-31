import { Router } from 'express';
import { z } from 'zod';
import { authMiddleware } from '../middleware/auth.js';
import { createNews, getNewsById, listNews, NEWS_CATEGORIES } from '../services/newsService.js';

const createNewsSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(20),
  url_image: z.string().url(),
  category: z.enum(NEWS_CATEGORIES),
});

export const newsRouter = Router();

newsRouter.get('/', async (req, res) => {
  try {
    const category = typeof req.query.category === 'string' ? req.query.category : undefined;
    const items = await listNews(category);
    return res.json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

newsRouter.get('/:id', async (req, res) => {
  try {
    const item = await getNewsById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'News not found' });
    }
    return res.json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

newsRouter.post('/', authMiddleware, async (req, res) => {
  const parsed = createNewsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload', errors: parsed.error.flatten() });
  }

  try {
    const item = await createNews(req.user!.userId, parsed.data);
    return res.status(201).json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
