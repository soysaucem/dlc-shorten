import express from 'express';
import homeRouter from './home';
import authRouter from './auth';
import errorRouter from './error';

const router = express.Router();

/* GET home page. */
router.use('/', errorRouter, authRouter, homeRouter);

export default router;
