import { afterEach, afterAll, describe, it, expect } from 'vitest';
import request from 'supertest';

import { cleanupDatabase } from '../../helpers/cleanup.js';

import { prisma } from '../../../lib/prisma.js';

import app from '../../../src/app.js';

describe('Register', () => {
  it('should create user', async () => {
    await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    const user = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
    });

    expect(user).not.toBeNull();
  });

  it('should return error if email already exists', async () => {
    await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash: 'password123',
      },
    });

    const response = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    expect(response.status).toBe(400);
  });

  it('should return error if passwords do not match', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'different123',
    });

    expect(response.status).toBe(400);
  });

  it('should return error if email is missing', async () => {
    const response = await request(app).post('/api/auth/register').send({
      password: 'password123',
      confirmPassword: 'password123',
    });

    expect(response.status).toBe(400);
  });

  it('should return error if password is missing', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      confirmPassword: 'password123',
    });

    expect(response.status).toBe(400);
  });

  it('should return error if confirmPassword is missing', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(400);
  });

  it('should return error if email is wrong format', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'test@example',
      password: 'password123',
      confirmPassword: 'password123',
    });

    expect(response.status).toBe(400);
  });

  it('(1) should return error if password is wrong format', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'test@example',
      password: 'pass',
      confirmPassword: 'pass',
    });

    expect(response.status).toBe(400);
  });

  it('(2) should return error if password is wrong format', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'test@example',
      password: 'test_test_test_test_test_test_test_test_test_test_test',
      confirmPassword: 'test_test_test_test_test_test_test_test_test_test_test',
    });

    expect(response.status).toBe(400);
  });
});

afterEach(async () => {
  await cleanupDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});
