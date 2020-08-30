'use strict';

import express from 'express';
import homeRouter from './home';
import authRouter from './auth';
import dashboardRouter from './dashboard';

const router = express.Router();

/*
 * Set up routers for frontend.
 * homeRouter should be always in the last position.
 */
router.use('/', authRouter, dashboardRouter, homeRouter);

export default router;
