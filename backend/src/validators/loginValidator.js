import { body, validationResult } from 'express-validator';

import AppError from './AppError.js';

const loginValidationRules = [
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
];

function validateLogin(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new AppError(400, 'VALIDATION_ERROR', 'invalid request body'));
  }

  next();
}

export { loginValidationRules, validateLogin };
