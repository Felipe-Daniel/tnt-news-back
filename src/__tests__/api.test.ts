import { beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../app.js';
import * as authService from '../services/authService.js';
import * as newsService from '../services/newsService.js';

vi.mock('../services/authService.js');
vi.mock('../services/newsService.js');

describe('Auth routes', () => {
  const app = createApp();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('POST /auth/register returns 201 on success', async () => {
    vi.mocked(authService.registerUser).mockResolvedValue({
      user: { id: '1', name: 'Test', email: 'test@example.com' },
      token: 'jwt-token',
    });

    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'Test', email: 'test@example.com', password: '123456' });

    expect(response.status).toBe(201);
    expect(response.body.token).toBe('jwt-token');
  });

  it('POST /auth/register returns 409 when email exists', async () => {
    vi.mocked(authService.registerUser).mockRejectedValue(new Error('EMAIL_IN_USE'));

    const response = await request(app)
      .post('/auth/register')
      .send({ name: 'Test', email: 'test@example.com', password: '123456' });

    expect(response.status).toBe(409);
  });

  it('POST /auth/login returns 401 for invalid credentials', async () => {
    vi.mocked(authService.loginUser).mockRejectedValue(new Error('INVALID_CREDENTIALS'));

    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'wrong' });

    expect(response.status).toBe(401);
  });
});

describe('News routes', () => {
  const app = createApp();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET /health returns ok', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('GET /news returns news list', async () => {
    vi.mocked(newsService.listNews).mockResolvedValue([
      {
        id: '1',
        title: 'Test news',
        url_image: 'https://example.com/image.jpg',
        category: 'Tecnologia',
        author: 'Author',
        date: '2024-01-01',
      },
    ]);

    const response = await request(app).get('/news');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('GET /news/:id returns 404 when not found', async () => {
    vi.mocked(newsService.getNewsById).mockResolvedValue(null);

    const response = await request(app).get('/news/missing-id');

    expect(response.status).toBe(404);
  });

  it('POST /news requires authentication', async () => {
    const response = await request(app).post('/news').send({
      title: 'New article title here',
      content: 'This is a long enough content for validation to pass easily.',
      url_image: 'https://example.com/image.jpg',
      category: 'Tecnologia',
    });

    expect(response.status).toBe(401);
  });
});
