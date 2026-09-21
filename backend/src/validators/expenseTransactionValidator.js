import { body, validationResult } from 'express-validator';

import AppError from '../errors/AppError.js';

const expenseTransactionValidationRules = [
  body('accountId')
    .notEmpty()
    .withMessage('Please select an account.')
    .isString()
    .withMessage('Account ID must be a string.'),
  body('categoryId')
    .notEmpty()
    .withMessage('Please select a category.')
    .isString()
    .withMessage('Category ID must be a string.'),
  body('amount')
    .notEmpty()
    .withMessage('Amount is required.')
    .isNumeric()
    .withMessage('Amount must be a number.')
    .custom((value) => Number(value) > 0)
    .withMessage('Amount must be greater than 0.')
    .toFloat(),
];

function validateExpenseTransaction(req, res, next) {
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

export { expenseTransactionValidationRules, validateExpenseTransaction };
