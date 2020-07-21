import {CreatePostDatabase } from "../data/CreatePostsDatabase";
import express from "express";

export const PostRouter = express.Router();

PostRouter.post("/create", new CreatePostDatabase().CreatePostsDatabase);


