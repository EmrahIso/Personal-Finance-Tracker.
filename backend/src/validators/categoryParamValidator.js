import { param, validationResult } from 'express-validator';

import AppError from '../errors/AppError.js';

const categoryParamValidationRules = [
  param('id').isUUID().withMessage('Category ID must be a valid UUID.'),
];

function validateParamCategory(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new AppError(
        400,
        'INVALID_CATEGORY',
        'The category ID is invalid.',
        errors.array()
      )
    );
  }

  next();
}

export { categoryParamValidationRules, validateParamCategory };
