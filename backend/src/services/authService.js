import { prisma } from '../../lib/prisma.js';

const isEmailTaken = async ({ email }) => {
  if (!email) throw new Error('email is required!');

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return !!user;
};

const createUser = async ({ email, passwordHash }) => {
  if (!email) throw new Error('email is required!');
  if (!passwordHash) throw new Error('passwordHash is required!');

  if (await isEmailTaken({ email })) {
    throw new Error('Email already taken.');
  }

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });

  return user;
};

const getUserByEmail = async ({ email }) => {
  if (!email) throw new Error('email is required!');

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

const getUserById = async ({ id }) => {
  if (!id) throw new Error('id is required!');

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};

const authService = {
  isEmailTaken,
  createUser,
  getUserByEmail,
  getUserById,
};

export default authService;
