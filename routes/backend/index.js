import express from 'express';
import shortenRouter from './shorten';
import authRouter from './auth';
import userRouter from './user';
import linkRouter from './link';

const router = express.Router();

router.use('/', shortenRouter, authRouter, linkRouter, userRouter);

export default router;
