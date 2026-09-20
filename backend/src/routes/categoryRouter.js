import { Router } from 'express';

import {
  postCategory,
  getCategories,
} from '../controllers/categoryController.js';
import {
  categoryValidationRules,
  validatePostCategory,
} from '../validators/postCategoryValidator.js';

import requireAuth from '../middlewares/requireAuth.js';

const categoryRouter = Router();

categoryRouter.post(
  '/',
  requireAuth,
  categoryValidationRules,
  validatePostCategory,
  postCategory
);

categoryRouter.get('/', requireAuth, getCategories);

export default categoryRouter;
