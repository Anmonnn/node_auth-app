import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { catchError } from '../utils/catchErrors.js';

export const userRouter = new express.Router();

userRouter.get('/', authMiddleware, catchError(userController.getAllActivated))
