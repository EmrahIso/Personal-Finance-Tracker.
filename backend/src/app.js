import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import session from 'express-session';

import { prisma } from '../lib/prisma.js';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

import authRouter from './routes/authRouter.js';
import accountRouter from './routes/accountRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import transactionsRouter from './routes/transactionsRouter.js';

import errorHandler from './errors/errorHandler.js';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,

    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    }),

    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      httpOnly: true,
    },
  })
);

app.use('/api/auth', authRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/transactions', transactionsRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use(errorHandler);

export default app;
