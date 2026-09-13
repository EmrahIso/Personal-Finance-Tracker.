import { afterEach, beforeEach, afterAll, describe, it, expect } from 'vitest';
import request from 'supertest';

import { cleanupDatabase } from '../../helpers/cleanup.js';

import { generatePassword } from '../../../utils/password.js';

import { prisma } from '../../../lib/prisma.js';

import app from '../../../src/app.js';

describe('Guest', () => {
  it('should login as guest', async () => {
    const agent = request.agent(app);

    const response = await agent.post('/api/auth/guest');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([expect.stringContaining('connect.sid=')])
    );

    const meResponse = await agent.get('/api/auth/me');

    expect(meResponse.status).toBe(200);
    expect(meResponse.body.success).toBe(true);
    expect(meResponse.body.user.isGuest).toBe(true);
  });

  it('should create guest user', async () => {
    await request(app).post('/api/auth/guest');

    const users = await prisma.user.findMany({
      where: { isGuest: true },
    });

    expect(users).toHaveLength(1);
    expect(users[0].email).toMatch(/^guest-.*@example\.local$/);
    expect(users[0].passwordHash).toBe('');
  });

  it('should return error if user is already logged in', async () => {
    const agent = request.agent(app);

    const passwordHash = await generatePassword('password123');

    await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash,
      },
    });

    await agent.post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    const response = await agent.post('/api/auth/guest');

    expect(response.status).toBe(403);
  });

  it('should return error if guest is already logged in', async () => {
    const agent = request.agent(app);

    await agent.post('/api/auth/guest');

    const response = await agent.post('/api/auth/guest');

    expect(response.status).toBe(403);
  });
});

beforeEach(async () => {
  await cleanupDatabase();
});

afterEach(async () => {
  await cleanupDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});
