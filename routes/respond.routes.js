import { Router } from 'express';
import { RespondController } from '../controllers/respond.controller.js';
import { checkAuth } from '../utils/checkAuth.js';

export const router = new Router();

router.get('/', checkAuth, RespondController.getResponds);
router.post('/', checkAuth, RespondController.respondWork);
router.post('/watching', checkAuth, RespondController.addWatching);
router.post('/delete/:workId', RespondController.deleteWatching);
