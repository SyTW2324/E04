import express from "express";

import { postUser, postUserLogin } from "../routers/user/post.js";
import { getUserQuery, getUser } from "../routers/user/get.js";
import { patchUserQuery, patchUser } from "./user/patch.js";
import { deleteUserQuery, deleteUser } from "./user/delete.js";
import { verifyToken } from "./verifyToken.js";


export const userRouter = express.Router();



userRouter.post("/api/users", postUser)
userRouter.post("/api/users/login", postUserLogin)
userRouter.get("/api/users", getUserQuery)
userRouter.get("/api/users/:username", verifyToken, getUser)
userRouter.patch("/api/users", verifyToken, patchUserQuery)
userRouter.patch("/api/users/:username", verifyToken, patchUser)
userRouter.delete("/api/users", verifyToken, deleteUserQuery)
userRouter.delete("/api/users/:username", verifyToken, deleteUser)