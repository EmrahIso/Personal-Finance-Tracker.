import express from 'express';
import 'dotenv/config';

import session from 'express-session';

import { prisma } from './lib/prisma.js';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

const PORT = process.env.PORT || 5000;

import authRouter from './src/routes/authRouter.js';

const app = express();

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

app.use((error, req, res, next) => {
  console.error(error);

  return res
    .status(500)
    .json({ success: false, message: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
