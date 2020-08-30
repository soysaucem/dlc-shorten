'use strict';

import express from 'express';
import { routes } from '../../common/utils/vars';
import * as UserController from '../../controllers/user.controller';
import * as ShortenController from '../../controllers/shorten.controller';

const router = express.Router();

router.get(routes.api.users.user(':id'), UserController.getUser);

router.get(
  routes.api.users.shortenUrls(':id'),
  ShortenController.getShortenUrlsForUser
);

router.post(
  routes.api.users.updateProfile(':id'),
  UserController.updateUserProfile
);

router.post(
  routes.api.users.updatePassword(':id'),
  UserController.updateUserPassword
);

export default router;
