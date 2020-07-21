import express, { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { CreatePostDatabase } from "../data/CreatePostsDatabase";
import {BaseDatabase} from "../data/BaseDatabase";
import moment from "moment";


export const PostRouter = express.Router();

PostRouter.post("/create", async (req: Request, res: Response) => {
    try {
  
      const authenticator = new Authenticator();
      const tokenData = authenticator.getData(req.headers.authorization!);
  
    //   if (!req.body.title || !req.body.ingredients || !req.body.description) {
    //     throw new Error("Invalid");
    //   }
  
      const idGenerator = new IdGenerator()
      const id = idGenerator.generate()  
      const today = moment().format('YYYY-MM-DD');  
      const postData = {
        photo: req.body.photo,
        description: req.body.description,
        creation_date: req.body.creation_date,
        type: req.body.type
      }
  
      const postDb = new CreatePostDatabase()
      await postDb.createPosts(
        id,
        postData.photo,
        postData.description,
        today,
        postData.type,
        tokenData.id
      )
  
      res.status(200).send({
        message: "Post Criado"
      })
  
    } catch (err) {
      res.status(400).send({
        mesage: err.message
      })
    }
  });
  