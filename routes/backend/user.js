import express from 'express';
import * as UserController from '../../controllers/user.controller';
import * as ShortenController from '../../controllers/shorten.controller';

const router = express.Router();

router.get('/users/:id', UserController.getUser);
router.get('/users/:id/shortenUrls', ShortenController.getShortenUrlsForUser);

export default router;
