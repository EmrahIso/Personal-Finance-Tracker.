import {
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  describe,
  it,
  expect,
} from 'vitest';
import request from 'supertest';

import { cleanupDatabase } from '../../helpers/cleanup.js';

import { generatePassword } from '../../../utils/password.js';

import { prisma } from '../../../lib/prisma.js';

import app from '../../../src/app.js';

const LOGIN_PASSWORD = 'password123';

let passwordHash;

describe('Logout', () => {
  beforeAll(async () => {
    passwordHash = await generatePassword(LOGIN_PASSWORD);
  });

  it('should logout a user', async () => {
    const agent = request.agent(app);

    const createdUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash,
      },
    });

    await agent.post('/api/auth/login').send({
      email: 'test@example.com',
      password: LOGIN_PASSWORD,
    });

    const response = await agent.post('/api/auth/logout');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    const meResponse = await agent.get('/api/auth/me');

    expect(meResponse.status).toBe(401);

    const user = await prisma.user.findUnique({
      where: { id: createdUser.id },
    });

    expect(user).not.toBeNull();
  });

  it('should logout a guest and delete guest user', async () => {
    const agent = request.agent(app);

    await agent.post('/api/auth/guest');

    const guestUser = await prisma.user.findFirst({
      where: { isGuest: true },
    });

    const response = await agent.post('/api/auth/logout');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    const deletedGuest = await prisma.user.findUnique({
      where: { id: guestUser.id },
    });

    expect(deletedGuest).toBeNull();

    const meResponse = await agent.get('/api/auth/me');

    expect(meResponse.status).toBe(401);
  });

  it('should return error if user is not logged in', async () => {
    const response = await request(app).post('/api/auth/logout');

    expect(response.status).toBe(401);
  });

  it('should return error if user logs out twice', async () => {
    const agent = request.agent(app);

    await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash,
      },
    });

    await agent.post('/api/auth/login').send({
      email: 'test@example.com',
      password: LOGIN_PASSWORD,
    });

    await agent.post('/api/auth/logout');

    const response = await agent.post('/api/auth/logout');

    expect(response.status).toBe(401);
  });

  it('should return error if session user does not exist', async () => {
    const agent = request.agent(app);

    const createdUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash,
      },
    });

    await agent.post('/api/auth/login').send({
      email: 'test@example.com',
      password: LOGIN_PASSWORD,
    });

    await prisma.user.delete({
      where: { id: createdUser.id },
    });

    const response = await agent.post('/api/auth/logout');

    expect(response.status).toBe(404);
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
