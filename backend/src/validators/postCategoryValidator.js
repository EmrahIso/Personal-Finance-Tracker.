import { body, validationResult } from 'express-validator';

import AppError from '../errors/AppError.js';

const categoryValidationRules = [
  body('categoryName')
    .trim()
    .notEmpty()
    .withMessage('Category name is required.')
    .isLength({ min: 2, max: 16 })
    .withMessage('Name must be between 2 and 16 characters long.'),
  body('categoryType')
    .notEmpty()
    .withMessage('Category type is required.')
    .isIn(['INCOME', 'EXPENSE'])
    .withMessage('Category type must be either INCOME or EXPENSE.'),
];

function validateCategory(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new AppError(
        400,
        'VALIDATION_ERROR',
        'Please check the highlighted fields.',
        errors.array()
      )
    );
  }

  next();
}

export { categoryValidationRules, validateCategory };
