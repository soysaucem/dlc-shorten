import express from 'express';

const router = express.Router();

router.get('/login', (req, res, next) => {
  try {
    return res.render('pages/login', { pageTitle: 'Log in | Doge Shortener' });
  } catch (err) {
    return next(err);
  }
});

router.get('/signup', (req, res, next) => {
  try {
    return res.render('pages/signup', {
      pageTitle: 'Sign up | Doge Shortener',
    });
  } catch (err) {
    return next(err);
  }
});

export default router;