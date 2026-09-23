import { prisma } from '../../lib/prisma.js';

import AppError from '../errors/AppError.js';

const MAX_CATEGORIES = 30;

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

  const categoryCount = await prisma.category.count({
    where: {
      userId,
    },
  });

  if (categoryCount >= MAX_CATEGORIES) {
    throw new AppError(
      400,
      'CATEGORY_LIMIT_REACHED',
      `You can have a maximum of ${MAX_CATEGORIES} categories.`
    );
  }

  await prisma.category.create({
    data: {
      userId: user.id,
      type: categoryType,
      name: categoryName,
    },
  });
};

const updateCategory = async ({
  userId,
  categoryId,
  categoryName,
  categoryType,
}) => {
  if (!userId) throw new Error('updateCategory: userId is required.');

  if (!categoryId) throw new Error('updateCategory: categoryId is required.');
  if (!categoryName)
    throw new Error('updateCategory: categoryName is required.');
  if (!categoryType)
    throw new Error('updateCategory: categoryType is required.');

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(404, 'USER_NOT_FOUND', 'User not found.');
  }

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new AppError(404, 'CATEGORY_NOT_FOUND', 'Category not found.');
  }

  if (categoryType !== category.type) {
    throw new Error('updateCategory: categoryType does not match.');
  }

  await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
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

const getCategory = async ({ userId, categoryId }) => {
  if (!userId) throw new Error('getCategory: userId is required.');
  if (!categoryId) throw new Error('getCategory: categoryId is required.');

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(404, 'USER_NOT_FOUND', 'User not found.');
  }

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
    select: {
      id: true,
      name: true,
      type: true,
    },
  });

  if (!category) {
    throw new AppError(404, 'CATEGORY_NOT_FOUND', 'Category not found.');
  }

  return category;
};

const deleteCategory = async ({ userId, categoryId }) => {
  if (!userId) throw new Error('getCategory: userId is required.');
  if (!categoryId) throw new Error('getCategory: categoryId is required.');

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(404, 'USER_NOT_FOUND', 'User not found.');
  }

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new AppError(404, 'CATEGORY_NOT_FOUND', 'Category not found.');
  }

  await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });
};

const categoryService = {
  addDefaultCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getUsersCategories,
  getCategory,
};

export default categoryService;
