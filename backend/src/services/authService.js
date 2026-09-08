import { prisma } from '../../lib/prisma.js';

import AppError from '../errors/AppError.js';

const isEmailTaken = async ({ email }) => {
  if (!email) throw new AppError(400, 'INVALID_INPUT', 'email is required!');

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return !!user;
};

const createUser = async ({ email, passwordHash }) => {
  if (!email) throw new AppError(400, 'INVALID_INPUT', 'email is required!');
  if (!passwordHash)
    throw new AppError(400, 'INVALID_INPUT', 'passwordHash is required!');

  const existingUser = await isEmailTaken({ email });

  if (existingUser) {
    throw new AppError(400, 'EMAIL_TAKEN', 'Email already taken.');
  }

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });

  return user;
};

const createGuestUser = async () => {
  const guestEmail = `guest-${crypto.randomUUID()}@example.local`;

  const user = await prisma.user.create({
    data: {
      email: guestEmail,
      passwordHash: '',
      isGuest: true,
    },
  });

  return user;
};

const getUserByEmail = async ({ email }) => {
  if (!email) throw new AppError(400, 'INVALID_INPUT', 'email is required!');

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError(404, 'USER_NOT_FOUND', 'User not found.');
  }

  return user;
};

const getUserById = async ({ id }) => {
  if (!id) throw new AppError(400, 'INVALID_INPUT', 'id is required!');

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      isGuest: true,
    },
  });

  if (!user) {
    throw new AppError(404, 'USER_NOT_FOUND', 'User not found.');
  }

  return user;
};

const deleteUserById = async ({ id }) => {
  if (!id) throw new AppError(400, 'INVALID_INPUT', 'id is required!');

  const user = await getUserById({ id });

  if (!user) {
    throw new AppError(404, 'USER_NOT_FOUND', 'User not found.');
  }

  await prisma.user.delete({
    where: {
      id,
    },
  });
};

const authService = {
  isEmailTaken,
  createUser,
  getUserByEmail,
  getUserById,
  createGuestUser,
  deleteUserById,
};

export default authService;
