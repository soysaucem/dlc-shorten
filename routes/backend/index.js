import express from 'express';
import shortenRouter from './shorten';

const router = express.Router();

router.use('/', shortenRouter);

export default router;
