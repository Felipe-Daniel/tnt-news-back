import { describe, expect, it } from 'vitest';
import { signToken } from '../middleware/auth.js';

describe('auth middleware helpers', () => {
  it('signToken returns a JWT string', () => {
    const token = signToken({ userId: 'user-1', email: 'test@example.com' });
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });
});
