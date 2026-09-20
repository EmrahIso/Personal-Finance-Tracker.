import { prisma } from '../../lib/prisma.js';

import AppError from '../errors/AppError.js';

export const DEFAULT_CATEGORIES = [
  { name: 'Salary', type: 'INCOME' },
  { name: 'Freelance', type: 'INCOME' },
  { name: 'Gift', type: 'INCOME' },
  { name: 'Other Income', type: 'INCOME' },

  { name: 'Food', type: 'EXPENSE' },
  { name: 'Transport', type: 'EXPENSE' },
  { name: 'Fuel', type: 'EXPENSE' },
  { name: 'Shopping', type: 'EXPENSE' },
  { name: 'Bills', type: 'EXPENSE' },
  { name: 'Entertainment', type: 'EXPENSE' },
  { name: 'Health', type: 'EXPENSE' },
  { name: 'Other Expense', type: 'EXPENSE' },
];

const addDefaultCategories = async ({ userId, tx }) => {
  if (!userId) throw new Error('addDefaultCategories: userId is required.');

  const user = await tx.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(404, 'USER_NOT_FOUND', 'User not found.');
  }

  await tx.category.createMany({
    data: DEFAULT_CATEGORIES.map((category) => ({
      ...category,
      userId: user.id,
    })),
  });
};

const createCategory = async ({ userId, categoryName, categoryType }) => {
  if (!userId) throw new Error('createCategory: userId is required.');

  if (!categoryName)
    throw new Error('createCategory: categoryName is required.');
  if (!categoryType)
    throw new Error('createCategory: categoryType is required.');

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(404, 'USER_NOT_FOUND', 'User not found.');
  }

  await prisma.category.create({
    data: {
      userId: user.id,
      type: categoryType,
      name: categoryName,
    },
  });
};

const getUsersCategories = async ({ userId }) => {
  if (!userId) throw new Error('getUsersCategories: userId is required.');

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(404, 'USER_NOT_FOUND', 'User not found.');
  }

  const categories = await prisma.category.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
      type: true,
    },
  });

  return categories;
};

const categoryService = {
  addDefaultCategories,
  createCategory,
  getUsersCategories,
};

export default categoryService;
