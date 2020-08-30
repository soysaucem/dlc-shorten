'use strict';

import express from 'express';
import * as ShortenController from '../../controllers/shorten.controller';
import { routes } from '../../common/utils/vars';

const router = express.Router();

router.post(routes.api.shortenLink, ShortenController.createShortenUrl);

export default router;
