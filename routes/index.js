import { Router } from 'express';
import { router as userRouter } from './user.routes.js';
import { router as resumeRouter } from './resume.routes.js';
import { router as uploadRouter } from './upload.routes.js';
import { router as workRouter } from './work.routes.js';

export const router = new Router();

router.use('/user', userRouter);
router.use('/resume', resumeRouter);
router.use('/upload', uploadRouter);
router.use('/work', workRouter);
