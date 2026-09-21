import { Router } from 'express';

import requireAuth from '../middlewares/requireAuth.js';

import {
  incomeTransactionValidationRules,
  validateIncomeTransaction,
} from '../validators/incomeTransactionValidator.js';
import {
  expenseTransactionValidationRules,
  validateExpenseTransaction,
} from '../validators/expenseTransactionValidator.js';

import {
  postIncomeTransaction,
  postExpenseTransaction,
} from '../controllers/transactionsController.js';

const transactionsRouter = Router();

transactionsRouter.post(
  '/income',
  requireAuth,
  incomeTransactionValidationRules,
  validateIncomeTransaction,
  postIncomeTransaction
);

transactionsRouter.post(
  '/expense',
  requireAuth,
  expenseTransactionValidationRules,
  validateExpenseTransaction,
  postExpenseTransaction
);

export default transactionsRouter;
