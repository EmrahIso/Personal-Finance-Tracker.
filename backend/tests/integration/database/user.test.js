import { afterEach, afterAll, describe, it, expect } from 'vitest';
import { cleanupDatabase } from '../../helpers/cleanup.js';
import {
  createTestUser,
  createTestGuestUser,
} from '../../helpers/factories.js';

import { prisma } from '../../../lib/prisma.js';

describe('User database operations', () => {
  it('should create a user in the database', async () => {
    const createdUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash: 'password123',
      },
    });

    const user = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
    });

    expect(createdUser).toMatchObject({
      email: 'test@example.com',
      passwordHash: 'password123',
    });

    expect(user).toMatchObject({
      email: 'test@example.com',
      passwordHash: 'password123',
    });
  });

  it('should delete a user from the database', async () => {
    const createdUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash: 'password123',
      },
    });

    await prisma.user.delete({
      where: { email: 'test@example.com' },
    });

    const user = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
    });

    expect(user).toBeNull();
  });

  it('should update a user in the database', async () => {
    const createdUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash: 'password123',
      },
    });

    const user = await prisma.user.update({
      where: { email: 'test@example.com' },
      data: {
        email: 'updated@example.com',
      },
    });

    const updatedUser = await prisma.user.findUnique({
      where: { email: 'updated@example.com' },
    });

    expect(createdUser).toMatchObject({
      email: 'test@example.com',
      passwordHash: 'password123',
    });

    expect(updatedUser).toMatchObject({
      email: 'updated@example.com',
      passwordHash: 'password123',
    });

    expect(user).toMatchObject({
      email: 'updated@example.com',
      passwordHash: 'password123',
    });
  });

  it('should find a user by email', async () => {
    await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash: 'password123',
      },
    });

    const user = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
    });

    expect(user).not.toBeNull();
    expect(user).toMatchObject({
      email: 'test@example.com',
      passwordHash: 'password123',
    });
  });

  it('should find all users in the database', async () => {
    for (let i = 1; i <= 5; i++) {
      await createTestUser();
    }

    const users = await prisma.user.findMany();

    expect(users.length).toBe(5);
  });

  it('should not allow duplicate email addresses', async () => {
    await createTestUser({
      email: 'test@example.com',
    });

    await expect(
      prisma.user.create({
        data: {
          email: 'test@example.com',
          passwordHash: 'password123',
        },
      })
    ).rejects.toThrow();
  });

  it('should apply default values when creating a user', async () => {
    const user = await createTestUser();

    expect(user.isGuest).toBe(false);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it('should create a guest user', async () => {
    const user = await createTestGuestUser();

    const savedUser = await prisma.user.findUnique({
      where: { id: user.id },
    });

    expect(savedUser).toMatchObject({
      isGuest: true,
    });
  });
});

afterEach(async () => {
  await cleanupDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});
