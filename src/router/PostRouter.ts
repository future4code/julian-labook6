import express from "express";
import { create } from "../controller/PostController";


export const PostRouter = express.Router();

PostRouter.post("/create", create);


