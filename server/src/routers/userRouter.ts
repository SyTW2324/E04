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

userRouter.post("/api/users", postUser)
userRouter.post("/api/users/login", postUserLogin)
userRouter.get("/api/users", getUserQuery)
userRouter.get("/api/users/:username", verifyToken, getUser)
userRouter.patch("/api/users", verifyToken, patchUserQuery)
userRouter.patch("/api/users/:username", verifyToken, patchUser)
userRouter.delete("/api/users", verifyToken, deleteUserQuery)
userRouter.delete("/api/users/:username", verifyToken, deleteUser)