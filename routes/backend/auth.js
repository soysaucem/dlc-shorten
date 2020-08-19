import express from 'express';
import * as AuthController from '../../controllers/auth.controller';
import { routes } from '../../common/utils/vars';

const router = express.Router();

router.post(routes.api.auth.login, AuthController.login);
router.post(routes.api.auth.signup, AuthController.signup);
router.post(routes.api.auth.logout, AuthController.logout);

export default router;
