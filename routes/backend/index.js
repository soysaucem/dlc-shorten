import express from 'express';
import shortenRouter from './shorten';
import authRouter from './auth';
import userRouter from './user';

const router = express.Router();

router.use('/', shortenRouter, authRouter, userRouter);

export default router;
