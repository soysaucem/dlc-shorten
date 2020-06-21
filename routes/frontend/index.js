import express from 'express';
import homeRouter from './home';
import userRouter from './user';
import authRouter from './auth';

const router = express.Router();

/* GET home page. */
router.use('/', homeRouter, authRouter);
router.use('/users', userRouter);

export default router;
