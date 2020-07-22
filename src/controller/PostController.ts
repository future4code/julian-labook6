import express, { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { CreatePostDatabase } from "../data/CreatePostsDatabase";
import moment from "moment";

export const create = async (req: Request, res: Response) => {
    try {
  
      const authenticator = new Authenticator();
      const tokenData = authenticator.getData(req.headers.authorization!);
  
       if (!req.body.photo || !req.body.description || !req.body.type) {
         throw new Error("Invalid");
       }
  
      const idGenerator = new IdGenerator()
      const id = idGenerator.generate()  
      const today = moment().format('YYYY-MM-DD');  
      const postData = {
        photo: req.body.photo,
        description: req.body.description,
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
  };
  