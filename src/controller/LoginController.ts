import { Request, Response } from 'express';
import { LoginDatabase } from '../data/LoginDatabase';
import { Authenticator } from '../services/Authenticator';
import { HashManager } from '../services/HashManager';

export class LoginController {
    
    async login(req: Request, res: Response){
        try {

        const email = req.body.email;
        const password = req.body.password;

        const userDb = new LoginDatabase();
        const user = await userDb.getUserByEmail(email);

        const hashManager = new HashManager();
        const isPasswordCorrect = await hashManager.compare(password, user.password);

        if(!isPasswordCorrect) {
            throw new Error('incorrect username or password')
        }

        const authenticator = new Authenticator();
        const token = authenticator.generateToken({
            id: user.id
        });

        res.status(200).send({
            message: 'User successfully logged in',
            token
        })
    } catch (err){
        res.status(400).send({
            message:err.message
        })

    }
  }
}

  
