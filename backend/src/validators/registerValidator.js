import { body, validationResult } from 'express-validator';

import authService from '../services/authService.js';

const registerValidationRules = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isLength({ min: 5, max: 254 })
    .withMessage('Email must be between 5 and 254 characters long.')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom(async (value, { req }) => {
      const user = await authService.isEmailTaken({ email: value });

      if (user) {
        throw new Error('Email already taken.');
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 8 and 20 characters long.'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required.')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be between 8 and 20 characters long.')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match.');
      }
      return true;
    }),
];

function validateRegister(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((error) => ({
        path: error.path,
        msg: error.msg,
      })),
    });
  }

  next();
}

export { registerValidationRules, validateRegister };
