import authService from '../services/authService.js';
import { generatePassword, validatePassword } from '../../utils/password.js';

import AppError from '../errors/AppError.js';

const postRegister = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      throw new AppError(400, 'PASSWORD_MISMATCH', 'Passwords do not match.');
    }

    const passwordHash = await generatePassword(password);

    await authService.createUser({
      email,
      passwordHash,
    });

    return res
      .status(201)
      .json({ success: true, message: 'User registered successfully.' });
  } catch (error) {
    next(error);
  }
};

const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.getUserByEmail({ email });

    const isPasswordValid = await validatePassword(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new AppError(
        401,
        'INVALID_CREDENTIALS',
        'Invalid email or password.'
      );
    }

    req.session.userId = user.id;

    return res.status(200).json({ success: true, msg: 'Login successful.' });
  } catch (error) {
    next(error);
  }
};

const postLogout = async (req, res, next) => {
  const userId = req.session.userId;

  if (!userId) {
    throw new AppError(401, 'UNAUTHORIZED', 'User is not logged in.');
  }

  const user = await authService.getUserById({ id: userId });

  if (user.isGuest) {
    await authService.deleteUserById({ id: userId });
  }

  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }

    res.clearCookie('connect.sid');

    return res.status(200).json({ success: true, msg: 'Logout successful.' });
  });
};

const postGuest = async (req, res, next) => {
  try {
    const user = await authService.createGuestUser();

    req.session.userId = user.id;

    return res
      .status(200)
      .json({ success: true, msg: 'Guest login successful.' });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById({ id: req.session.userId });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export { postLogin, postRegister, getMe, postLogout, postGuest };
