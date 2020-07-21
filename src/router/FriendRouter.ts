import { FriendController } from "./../controller/FriendController";
import express from "express";

export const friendRouter = express.Router();

friendRouter.post("/addfriend", new FriendController().makeFriend);

