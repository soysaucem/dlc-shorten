import express from 'express';
import * as ShortenController from '../../controllers/shorten.controller';
import loggedinGuard from '../../common/middlewares/loggedin-guard';

const router = express.Router();

/* GET home page. */
router.get('/', loggedinGuard, (req, res, next) => {
  try {
    const errors = req.session.errors ? req.session.errors : null;
    req.session.errors = null;

    return res.render('pages/index', {
      pageTitle: 'Doge Shortener',
      errors,
      shortenObjects: req.session.shortenObjects,
      user: req.session.user,
    });
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', ShortenController.redirectUrl);

export default router;
