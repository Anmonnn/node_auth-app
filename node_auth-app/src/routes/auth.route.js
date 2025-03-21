import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import { catchError } from '../utils/catchErrors.js';

export const authRouter = new express.Router();

authRouter.post('/registration', catchError(authController.register));
authRouter.get('/activation/:activationToken', catchError(authController.activate))
authRouter.post('/login', catchError(authController.login));
authRouter.get('/refresh', catchError(authController.refresh))
authRouter.post('/logout', catchError(authController.logout))
