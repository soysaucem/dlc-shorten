import express from 'express';
import * as ShortenController from '../../controllers/shorten.controller';

const router = express.Router();

router.post('/shorten', ShortenController.createShortenUrl);

export default router;
