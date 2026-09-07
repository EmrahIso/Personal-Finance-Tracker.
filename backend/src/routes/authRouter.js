import { Router } from 'express';

import {
  postLogin,
  postRegister,
  getMe,
  postLogout,
  postGuest,
} from '../controllers/authController.js';

import {
  registerValidationRules,
  validateRegister,
} from '../validators/registerValidator.js';

import {
  loginValidationRules,
  validateLogin,
} from '../validators/loginValidator.js';

import requireAuth from '../middlewares/requireAuth.js';
import requireGuest from '../middlewares/requireGuest.js';

const authRouter = Router();

authRouter.get('/me', requireAuth, getMe);

authRouter.post(
  '/login',
  requireGuest,
  loginValidationRules,
  validateLogin,
  postLogin
);

authRouter.post(
  '/register',
  requireGuest,
  registerValidationRules,
  validateRegister,
  postRegister
);

authRouter.post('/guest', requireGuest, postGuest);

authRouter.post('/logout', postLogout);

export default authRouter;
