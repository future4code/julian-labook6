import express from "express";
import { create } from "../controller/PostController";
import { feed } from "../controller/FeedController";

export const PostRouter = express.Router();

PostRouter.post("/", create);
PostRouter.get("/feed", feed );