import { body, validationResult } from 'express-validator';

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

export { loginValidationRules, validateLogin };
