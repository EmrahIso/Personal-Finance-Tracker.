import authService from '../services/authService.js';
import { generatePassword, validatePassword } from '../../utils/password.js';

const postRegister = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match.' });
    }

    const passwordHash = await generatePassword(password);

    await authService.createUser({
      email,
      passwordHash,
    });

    return res
      .status(201)
      .json({ success: true, msg: 'User registered successfully.' });
  } catch (error) {
    if (error.message === 'Email already taken.') {
      return res.status(400).json({ msg: 'Email already taken.' });
    }

    next(error);
  }
};

const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.getUserByEmail({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password.' });
    }

    const isPasswordValid = await validatePassword(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(400).json({ msg: 'Invalid email or password.' });
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
    return res.status(400).json({ msg: 'No user is currently logged in.' });
  }

  const user = await authService.getUserById({ id: userId });

  if (!user) {
    return res.status(400).json({ msg: 'User not found.' });
  }

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

    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export { postLogin, postRegister, getMe, postLogout, postGuest };
