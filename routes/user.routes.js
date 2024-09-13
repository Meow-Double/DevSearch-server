import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { checkAuth } from '../utils/checkAuth.js';
import { UploadController } from '../controllers/upload.controller.js';
import fileMiddleware from "../middlewares/file.js";

export const router = new Router();

router.post('/registration', UserController.register);
router.post('/login', UserController.login);
router.get('/auth', checkAuth, UserController.auth);
router.post('/update-password', checkAuth, UserController.updatePassword);
router.post('/update-email', checkAuth, UserController.updateEmail);
router.post('/upload', fileMiddleware.single("avatarka"), checkAuth, UploadController.upload);
// router.post('/login', userController.loginUser);
// router.get('/auth', checkAuth, userController.auth);
