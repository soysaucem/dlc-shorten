import express from 'express';
import homeRouter from './home';
import authRouter from './auth';

const router = express.Router();

/* GET home page. */
router.use('/', authRouter, homeRouter);

export default router;
