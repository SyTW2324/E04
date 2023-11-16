import express from "express";

import { postCategory } from "../routers/category/post.js";
import { getCategoryQuery, getCategory } from "../routers/category/get.js";
import { patchCategoryQuery, patchCategory } from "./category/patch.js";
import { deleteCategoryQuery, deleteCategory } from "./category/delete.js";

export const categoryRouter = express.Router();

categoryRouter.post("/categories", postCategory)
categoryRouter.get("/categories", getCategoryQuery)
categoryRouter.get("/categories/:category_id", getCategory)
categoryRouter.patch("/categories", patchCategoryQuery)
categoryRouter.patch("/categories/:category_id", patchCategory)
categoryRouter.delete("/categories", deleteCategoryQuery)
categoryRouter.delete("/categories/:category_id", deleteCategory)