import prisma from '../../lib/prisma.js';
import crypto from 'crypto';

export const createTestUser = async (overrides = {}) => {
  const defaultUserData = {
    email: `test-${crypto.randomUUID()}@example.com`,
    passwordHash: 'password123',
    ...overrides,
  };

  return await prisma.user.create({
    data: defaultUserData,
  });
};

export const createTestGuestUser = async (overrides = {}) => {
  const defaultUserData = {
    email: `guest-${crypto.randomUUID()}@example.com`,
    passwordHash: 'guestpassword',
    isGuest: true,
    ...overrides,
  };

  return await prisma.user.create({
    data: defaultUserData,
  });
};
