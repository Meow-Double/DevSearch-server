import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { WorkController } from '../controllers/work.controller.js';
import fileMiddleware from '../middlewares/file.js';
export const router = new Router();

router.post('/create', checkAuth, WorkController.createWork);
router.post('/upload', fileMiddleware.single('work-bg'), WorkController.uploadImg);
router.get('/my-works',checkAuth, WorkController.getMyWorks);
// router.get('/:id', WorkController.getWork);
router.get('', WorkController.getWorkCards);
router.get('/:id', WorkController.getWork);

// router.post('/login', userController.loginUser);
// router.get('/auth', checkAuth, userController.auth);
