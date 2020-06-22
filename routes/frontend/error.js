import express from 'express';

const router = express.Router();

router.get('/error/404', (req, res, next) => {
  try {
    return res.render('pages/404.html');
  } catch (err) {
    return next(err);
  }
});

router.get('/error/503', (req, res, next) => {
  try {
    return res.render('pages/503.html');
  } catch (err) {
    return next(err);
  }
});

export default router;
