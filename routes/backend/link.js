import express from 'express';
import { routes } from '../../common/utils/vars';
import * as LinkController from '../../controllers/link.controller';

const router = express.Router();

router.post(routes.api.links.edit(':id'), LinkController.editLink);

router.post(routes.api.links.delete(':id'), LinkController.deleteLink);

export default router;
