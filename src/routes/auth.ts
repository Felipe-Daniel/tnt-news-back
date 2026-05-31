import { Router } from 'express';
import { z } from 'zod';
import { loginUser, registerUser } from '../services/authService.js';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authRouter = Router();

authRouter.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload', errors: parsed.error.flatten() });
  }

  try {
    const result = await registerUser(parsed.data.name, parsed.data.email, parsed.data.password);
    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_IN_USE') {
      return res.status(409).json({ message: 'Email already in use' });
    }
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

authRouter.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid payload', errors: parsed.error.flatten() });
  }

  try {
    const result = await loginUser(parsed.data.email, parsed.data.password);
    return res.json(result);
  } catch (error) {
    if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
