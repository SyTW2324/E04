import express from "express";

import { postImage } from "../routers/image/post.js";
import { getImageQuery, getImage } from "../routers/image/get.js";
import { patchImageQuery, patchImage } from "./image/patch.js";
import { deleteImageQuery, deleteImage } from "./image/delete.js";

export const imageRouter = express.Router();

imageRouter.post("/api/images", postImage)
imageRouter.get("/api/images", getImageQuery)
imageRouter.get("/api/images/:image_id", getImage)
imageRouter.patch("/api/images", patchImageQuery)
imageRouter.patch("/api/images/:image_id", patchImage)
imageRouter.delete("/api/images", deleteImageQuery)
imageRouter.delete("/api/images/:image_id", deleteImage)