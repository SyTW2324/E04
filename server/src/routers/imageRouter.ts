import express from "express";

import { postImage } from "../routers/image/post.js";
import { getImageQuery, getImage } from "../routers/image/get.js";
import { patchImageQuery, patchImage } from "./image/patch.js";
import { deleteImageQuery, deleteImage } from "./image/delete.js";

export const imageRouter = express.Router();

imageRouter.post("/images", postImage)
imageRouter.get("/images", getImageQuery)
imageRouter.get("/images/:image_id", getImage)
imageRouter.patch("/images", patchImageQuery)
imageRouter.patch("/images/:image_id", patchImage)
imageRouter.delete("/images", deleteImageQuery)
imageRouter.delete("/images/:image_id", deleteImage)