import { Router } from 'express';

import {
  accountValidationRules,
  validatePostAccount,
} from '../validators/postAccountValidator.js';

import { postAccount, getAccounts } from '../controllers/accountController.js';

import requireAuth from '../middlewares/requireAuth.js';

const accountRouter = Router();

accountRouter.post(
  '/',
  requireAuth,
  accountValidationRules,
  validatePostAccount,
  postAccount
);

accountRouter.get('/', requireAuth, getAccounts);

export default accountRouter;
