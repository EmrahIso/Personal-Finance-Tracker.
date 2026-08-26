import { Router } from 'express';

import {
  postLogin,
  postRegister,
  getMe,
  postLogout,
} from '../controllers/authController.js';

import {
  registerValidationRules,
  validateRegister,
} from '../validators/registerValidator.js';

import {
  loginValidationRules,
  validateLogin,
} from '../validators/loginValidator.js';

const authRouter = Router();

authRouter.get('/me', requireAuth, getMe);

authRouter.post('/login', loginValidationRules, validateLogin, postLogin);

authRouter.post(
  '/register',
  registerValidationRules,
  validateRegister,
  postRegister
);

authRouter.post('/logout', postLogout);

export default authRouter;
