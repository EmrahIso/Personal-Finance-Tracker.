import transactionService from '../services/transactionsService.js';

import AppError from '../errors/AppError.js';

const postIncomeTransaction = async (req, res, next) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      throw new AppError(401, 'UNAUTHORIZED', 'User is not logged in.');
    }

    const { accountId, categoryId, amount } = req.body;

    await transactionService.createIncomeTransaction({
      userId,
      accountId,
      categoryId,
      amount,
    });

    res
      .status(201)
      .json({ success: true, msg: 'Income transaction created successfully.' });
  } catch (error) {
    next(error);
  }
};

const postExpenseTransaction = async (req, res, next) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      throw new AppError(401, 'UNAUTHORIZED', 'User is not logged in.');
    }

    const { accountId, categoryId, amount } = req.body;

    await transactionService.createExpenseTransaction({
      userId,
      accountId,
      categoryId,
      amount,
    });

    res.status(201).json({
      success: true,
      msg: 'Expense transaction created successfully.',
    });
  } catch (error) {
    next(error);
  }
};

export { postIncomeTransaction, postExpenseTransaction };
