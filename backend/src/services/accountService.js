import { prisma } from '../../lib/prisma.js';

import AppError from '../errors/AppError.js';

const createAccount = async ({ accountName, initialBalance, userId }) => {
  if (!id)
    throw new AppError(
      500,
      'INTERNAL_SERVER_ERROR',
      'An unexpected error occurred.'
    );

  if (!accountName)
    throw new AppError(400, 'INVALID_INPUT', 'accountName is required!');
  if (!initialBalance)
    throw new AppError(400, 'INVALID_INPUT', 'initialBalance is required!');

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(404, 'USER_NOT_FOUND', 'User not found.');
  }

  const account = await prisma.account.create({
    data: {
      name: accountName,
      balance: initialBalance,
      userId: userId,
    },
  });

  return account;
};

const getUsersAccounts = async ({ userId }) => {
  if (!userId)
    throw new AppError(
      500,
      'INTERNAL_SERVER_ERROR',
      'An unexpected error occurred.'
    );

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(404, 'USER_NOT_FOUND', 'User not found.');
  }

  const accounts = await prisma.account.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      balance: true,
    },
  });

  return accounts;
};

const accountService = { createAccount, getUsersAccounts };

export default accountService;
