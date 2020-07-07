import express from 'express';
import authGuard from '../../common/middlewares/auth-guard';

const router = express.Router();

router.get('/dashboard', authGuard, (req, res, next) => {
  try {
    res.status(200).send('User dashboard!');
  } catch (err) {
    return next(err);
  }
});

export default router;
