import { Router } from 'express';

import {
  postCategory,
  getCategories,
  getCategory,
  patchCategory,
  deleteCategory,
} from '../controllers/categoryController.js';

import {
  categoryValidationRules,
  validateCategory,
} from '../validators/postCategoryValidator.js';

import {
  categoryParamValidationRules,
  validateParamCategory,
} from '../validators/categoryParamValidator.js';

import requireAuth from '../middlewares/requireAuth.js';

const categoryRouter = Router();

categoryRouter.get('/', requireAuth, getCategories);
categoryRouter.get(
  '/:id',
  requireAuth,
  categoryParamValidationRules,
  validateParamCategory,
  getCategory
);

categoryRouter.patch(
  '/:id',
  requireAuth,
  categoryParamValidationRules,
  validateParamCategory,
  categoryValidationRules,
  validateCategory,
  patchCategory
);

categoryRouter.post(
  '/',
  requireAuth,
  categoryValidationRules,
  validateCategory,
  postCategory
);

categoryRouter.delete(
  '/:id',
  requireAuth,
  categoryParamValidationRules,
  validateParamCategory,
  deleteCategory
);

export default categoryRouter;
