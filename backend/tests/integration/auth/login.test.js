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

describe('Login', () => {
  beforeAll(async () => {
    passwordHash = await generatePassword(LOGIN_PASSWORD);
  });

  it('should login a user', async () => {
    const agent = request.agent(app);

    const createdUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash,
      },
    });

    const response = await agent.post('/api/auth/login').send({
      email: 'test@example.com',
      password: LOGIN_PASSWORD,
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    expect(response.headers['set-cookie']).toEqual(
      expect.arrayContaining([expect.stringContaining('connect.sid=')])
    );

    const meResponse = await agent.get('/api/auth/me');

    expect(meResponse.status).toBe(200);
    expect(meResponse.body.success).toBe(true);
    expect(meResponse.body.user.id).toBe(createdUser.id);
  });

  it('should return error if user does not exist', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: LOGIN_PASSWORD,
    });

    expect(response.status).toBe(404);
  });

  it('should return error if password is incorrect', async () => {
    await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash,
      },
    });

    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'wrongpass',
    });

    expect(response.status).toBe(401);
  });

  it('should return error if email is missing', async () => {
    const response = await request(app).post('/api/auth/login').send({
      password: LOGIN_PASSWORD,
    });

    expect(response.status).toBe(400);
  });

  it('should return error if password is missing', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
    });

    expect(response.status).toBe(400);
  });

  it('should return error if email is wrong format', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example',
      password: LOGIN_PASSWORD,
    });

    expect(response.status).toBe(400);
  });

  it('(1) should return error if password is wrong format', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'pass',
    });

    expect(response.status).toBe(400);
  });

  it('(2) should return error if password is wrong format', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'test_test_test_test_test_test_test_test_test_test_test',
    });

    expect(response.status).toBe(400);
  });

  it('should return error if user is already logged in', async () => {
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

    const response = await agent.post('/api/auth/login').send({
      email: 'test@example.com',
      password: LOGIN_PASSWORD,
    });

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
