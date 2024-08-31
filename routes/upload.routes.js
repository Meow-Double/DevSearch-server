import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller.js';
import fileMiddleware from "../middlewares/file.js";
import { checkAuth } from '../utils/checkAuth.js';

export const router = new Router();

router.post('/', fileMiddleware.single("avatarka"), checkAuth, UploadController.upload);
