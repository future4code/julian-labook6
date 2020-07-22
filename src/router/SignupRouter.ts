import express from 'express';
import { SignupController } from '../controller/SignupController';

export const signupRouter = express.Router();

signupRouter.post('/', new SignupController().signup);


