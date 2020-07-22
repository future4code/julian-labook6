import { Request, Response } from 'express';
import { IdGenerator } from '../services/IdGenerator';
import { Authenticator } from '../services/Authenticator';
import { SignupDatabase } from '../data/SignupDatabase';
import { HashManager } from '../services/HashManager';

export class SignupController {

    async signup(req: Request, res: Response){
    try {
      
    if (!req.body.email || req.body.email.indexOf("@") === -1) {
        throw new Error("Invalid email");
    }
    
    const userData = {
        email: req.body.email,
        name: req.body.name ,
        password: req.body.password
    };
  
    const idGenerator = new IdGenerator();
    const id = idGenerator.generate();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(userData.password);
  
    const userDb = new SignupDatabase()
    await userDb.createUser(id, userData.email, userData.name, hashPassword);
  
    const authenticator = new Authenticator();
    const token = authenticator.generateToken({
        id,
    });
  
    res.status(200).send({
        token,
        });
    } catch (err) {
        res.status(400).send({
        message: err.message,
        });
    }
    
  }
}