import express from 'express';
import { LoginController } from '../controller/LoginController';

export const loginRouter = express.Router();

loginRouter.post('/', new LoginController().login);

