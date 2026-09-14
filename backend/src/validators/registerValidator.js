import { body, validationResult } from 'express-validator';

import AppError from '../errors/AppError.js';

const registerValidationRules = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isLength({ min: 5, max: 254 })
    .withMessage('Email must be between 5 and 254 characters long.')
    .isEmail()
    .withMessage('Please enter a valid email.'),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 8 and 20 characters long.'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required.')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 8 and 20 characters long.'),
];

function validateRegister(req, res, next) {
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

export { registerValidationRules, validateRegister };
