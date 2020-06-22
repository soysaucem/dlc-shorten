import express from 'express';
import loggedinGuard from '../../common/middlewares/loggedin-guard';

const router = express.Router();

router.get('/login', loggedinGuard, (req, res, next) => {
  try {
    return res.render('pages/login', { pageTitle: 'Log in | Doge Shortener' });
  } catch (err) {
    return next(err);
  }
});

router.get('/signup', loggedinGuard, (req, res, next) => {
  try {
    return res.render('pages/signup', {
      pageTitle: 'Sign up | Doge Shortener',
    });
  } catch (err) {
    return next(err);
  }
});

export default router;
