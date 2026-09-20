import { body, validationResult } from 'express-validator';

import AppError from '../errors/AppError.js';

const accountValidationRules = [
  body('accountName')
    .trim()
    .notEmpty()
    .withMessage('Account name is required.')
    .isLength({ min: 5, max: 25 })
    .withMessage('Name must be between 5 and 25 characters long.'),
  body('initialBalance')
    .notEmpty()
    .withMessage('Initial income is required.')
    .isFloat()
    .withMessage('Initial income must be a number')
    .toFloat()
    .isFloat({ min: 0 })
    .withMessage('Initial income cannot be negative'),
];

function validatePostAccount(req, res, next) {
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

export { accountValidationRules, validatePostAccount };
