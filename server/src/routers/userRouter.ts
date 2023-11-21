import express from "express";

import { postUser, postUserLogin } from "../routers/user/post.js";
import { getUserQuery, getUser } from "../routers/user/get.js";
import { patchUserQuery, patchUser } from "./user/patch.js";
import { deleteUserQuery, deleteUser } from "./user/delete.js";

export const userRouter = express.Router();

import jwt from 'jsonwebtoken';

const TOKEN_KEY = process.env.TOKEN_KEY || '';



const verifyToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if(token==null)
    return res.status(401) .send("Token requerido");
  jwt.verify(token, TOKEN_KEY, (err: any, user: any) => {
    if(err) return res.status(403).send("Token invalido");
    req.user = user;
    next();
  });
}

userRouter.post("/users", postUser)
userRouter.post("/users/login", postUserLogin)
userRouter.get("/users", getUserQuery)
userRouter.get("/users/:username", verifyToken, getUser)
userRouter.patch("/users", verifyToken, patchUserQuery)
userRouter.patch("/users/:username", verifyToken, patchUser)
userRouter.delete("/users", verifyToken, deleteUserQuery)
userRouter.delete("/users/:username", verifyToken, deleteUser)