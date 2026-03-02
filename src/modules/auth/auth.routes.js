import express from 'express';
import * as authController from './auth.controller.js';
import { validateRegister } from '../../middlewares/validates.js';

const router = express.Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', authController.login);

export default router;x``