import express from 'express';
import authGuard from '../../common/middlewares/auth-guard';
import * as DashboardController from '../../controllers/dashboard.controller';
import { routes } from '../../common/utils/vars';

const router = express.Router();

router.get(
  routes.dashboard.home,
  authGuard,
  DashboardController.renderHomePage
);

router.get(
  routes.dashboard.profile,
  authGuard,
  DashboardController.renderProfilePage
);

router.get(
  routes.dashboard.links,
  authGuard,
  DashboardController.renderLinksPage
);

router.get(
  routes.dashboard.editLink(':id'),
  DashboardController.renderEditLinkPage
);

export default router;
