import { prisma } from '../../lib/prisma.js';

import AppError from '../errors/AppError.js';

const createIncomeTransaction = async ({
  userId,
  accountId,
  categoryId,
  amount,
}) => {
  if (!userId) throw new Error('createIncomeTransaction: userId is required');
  if (!accountId)
    throw new Error('createIncomeTransaction: accountId is required');
  if (!categoryId)
    throw new Error('createIncomeTransaction: categoryId is required');
  if (!amount) throw new Error('createIncomeTransaction: amount is required');

  const transaction = await prisma.$transaction(async (tx) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError(404, 'USER_NOT_FOUND', 'User not found.');
    }

    const account = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
    });

    if (!account || account.userId !== userId) {
      throw new AppError(404, 'ACCOUNT_NOT_FOUND', 'Account not found.');
    }

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category || category.userId !== userId) {
      throw new AppError(404, 'CATEGORY_NOT_FOUND', 'Category not found.');
    }

    if (category.type !== 'INCOME') {
      throw new AppError(
        400,
        'INVALID_CATEGORY_TYPE',
        'Income transactions require an income category.'
      );
    }

    const transaction = await tx.transaction.create({
      data: {
        userId,
        accountId,
        categoryId,
        amount,
        type: 'INCOME',
      },
    });

    await tx.account.update({
      where: {
        id: accountId,
      },
      data: {
        balance: {
          increment: amount,
        },
      },
    });

    return transaction;
  });

  return transaction;
};

const createExpenseTransaction = async ({
  userId,
  accountId,
  categoryId,
  amount,
}) => {
  if (!userId) throw new Error('createExpenseTransaction: userId is required');
  if (!accountId)
    throw new Error('createExpenseTransaction: accountId is required');
  if (!categoryId)
    throw new Error('createExpenseTransaction: categoryId is required');
  if (!amount) throw new Error('createExpenseTransaction: amount is required');

  const transaction = prisma.$transaction(async (tx) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new AppError(404, 'USER_NOT_FOUND', 'User not found.');
    }

    const account = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
    });

    if (!account || account.userId !== userId) {
      throw new AppError(404, 'ACCOUNT_NOT_FOUND', 'Account not found.');
    }

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category || category.userId !== userId) {
      throw new AppError(404, 'CATEGORY_NOT_FOUND', 'Category not found.');
    }

    if (category.type !== 'EXPENSE') {
      throw new AppError(
        400,
        'INVALID_CATEGORY_TYPE',
        'Expense transactions require an expense category.'
      );
    }

    const transaction = tx.transaction.create({
      data: {
        userId,
        accountId,
        categoryId,
        amount,
        type: 'EXPENSE',
      },
    });

    await tx.account.update({
      where: {
        id: accountId,
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    return transaction;
  });

  return transaction;
};

const transactionService = {
  createIncomeTransaction,
  createExpenseTransaction,
};

export default transactionService;
