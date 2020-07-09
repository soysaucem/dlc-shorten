import express from 'express';
import authGuard from '../../common/middlewares/auth-guard';

const router = express.Router();

router.get('/dashboard', authGuard, (req, res, next) => {
  try {
    return res.render('pages/dashboard', {
      pageTitle: 'Dashboard | Doge Shortener',
    });
  } catch (err) {
    return next(err);
  }
});

router.get('/dashboard/links', authGuard, (req, res, next) => {
  try {
    return res.status(200).send('links!');
  } catch (err) {
    return next(err);
  }
});

export default router;
