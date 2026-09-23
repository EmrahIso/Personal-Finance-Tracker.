import AppError from '../errors/AppError.js';

import categoryService from '../services/categoryService.js';

const postCategory = async (req, res, next) => {
  try {
    const { categoryName, categoryType } = req.body;

    const userId = req.session.userId;

    if (!userId) {
      throw new AppError(401, 'UNAUTHORIZED', 'User is not logged in.');
    }

    await categoryService.createCategory({
      userId,
      categoryName,
      categoryType,
    });

    res
      .status(201)
      .json({ success: true, msg: 'Category created successfully.' });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      throw new AppError(401, 'UNAUTHORIZED', 'User is not logged in.');
    }

    const categories = await categoryService.getUsersCategories({
      userId,
    });

    return res.status(201).json({ success: true, categories });
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      throw new AppError(401, 'UNAUTHORIZED', 'User is not logged in.');
    }

    const categoryId = req.params.id;

    const category = await categoryService.getCategory({ userId, categoryId });

    return res.json({ success: true, category });
  } catch (error) {
    next(error);
  }
};

const patchCategory = async (req, res, next) => {
  try {
    const { categoryName, categoryType } = req.body;

    const userId = req.session.userId;

    if (!userId) {
      throw new AppError(401, 'UNAUTHORIZED', 'User is not logged in.');
    }

    const categoryId = req.params.id;

    await categoryService.updateCategory({
      userId,
      categoryId,
      categoryName,
      categoryType,
    });

    res
      .status(201)
      .json({ success: true, msg: 'Category is updated successfully.' });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      throw new AppError(401, 'UNAUTHORIZED', 'User is not logged in.');
    }

    const categoryId = req.params.id;

    await categoryService.deleteCategory({ userId, categoryId });

    res
      .status(201)
      .json({ success: true, msg: 'Category deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

export {
  postCategory,
  getCategories,
  getCategory,
  patchCategory,
  deleteCategory,
};
