import accountService from '../services/accountService.js';

const postAccount = async (req, res, next) => {
  try {
    const { accountName, initialBalance } = req.body;

    const userId = req.session.userId;

    if (!userId) {
      throw new AppError(401, 'UNAUTHORIZED', 'User is not logged in.');
    }

    await accountService.createAccount({ accountName, initialBalance, userId });

    return res
      .status(201)
      .json({ success: true, msg: 'Account created successfully.' });
  } catch (error) {
    next(error);
  }
};

const getAccounts = async (req, res, next) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      throw new AppError(401, 'UNAUTHORIZED', 'User is not logged in.');
    }

    const accounts = await accountService.getUsersAccounts({
      userId,
    });

    return res.status(201).json({ success: true, accounts });
  } catch (error) {
    next(error);
  }
};

export { postAccount, getAccounts };
