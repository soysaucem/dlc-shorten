import express from 'express';
import * as ShortenController from '../../controllers/shorten.controller';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const errors = req.session.errors ? req.session.errors : null;
  const shortenObjects = req.session.shortenObjects
    ? req.session.shortenObjects
    : null;
  req.session.errors = null;

  res.render('pages/index', {
    pageTitle: 'Doge Shortener',
    errors,
    shortenObjects,
  });
});

router.get('/:id', ShortenController.redirectUrl);

export default router;
