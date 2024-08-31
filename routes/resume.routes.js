import { Router } from 'express';
import { ResumeController } from '../controllers/resume.controller.js';
import { checkAuth } from '../utils/checkAuth.js';

export const router = new Router();

router.post('/update', checkAuth, ResumeController.updateResume);
router.get('/', checkAuth, ResumeController.getResume);
router.delete('/delete', checkAuth, ResumeController.deleteResume);

// router.post('/login', userController.loginUser);
// router.get('/auth', checkAuth, userController.auth);
