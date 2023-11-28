import express from "express";

import { postCategory } from "../routers/category/post.js";
import { getCategoryQuery, getCategory } from "../routers/category/get.js";
import { patchCategoryQuery, patchCategory } from "./category/patch.js";
import { deleteCategoryQuery, deleteCategory } from "./category/delete.js";

export const categoryRouter = express.Router();

categoryRouter.post("/api/categories", postCategory)
categoryRouter.get("/api/categories", getCategoryQuery)
categoryRouter.get("/api/categories/:category_id", getCategory)
categoryRouter.patch("/api/categories", patchCategoryQuery)
categoryRouter.patch("/api/categories/:category_id", patchCategory)
categoryRouter.delete("/api/categories", deleteCategoryQuery)
categoryRouter.delete("/api/categories/:category_id", deleteCategory)