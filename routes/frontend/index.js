import express from 'express';
import homeRouter from './home';
import usersRouter from './users';

const router = express.Router();

/* GET home page. */
router.use('/', homeRouter);
router.use('/users', usersRouter);

export default router;
