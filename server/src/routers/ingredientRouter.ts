import express from "express";

import { postIngredient } from "../routers/ingredient/post.js";
import { getIngredientQuery, getIngredient } from "../routers/ingredient/get.js";
import { patchIngredientQuery, patchIngredient } from "./ingredient/patch.js";
import { deleteIngredientQuery, deleteIngredient } from "./ingredient/delete.js";

export const ingredientRouter = express.Router();

ingredientRouter.post("/api/ingredients", postIngredient)
ingredientRouter.get("/api/ingredients", getIngredientQuery)
ingredientRouter.get("/api/ingredients/:ingredient_id", getIngredient)
ingredientRouter.patch("/api/ingredients", patchIngredientQuery)
ingredientRouter.patch("/api/ingredients/:ingredient_id", patchIngredient)
ingredientRouter.delete("/api/ingredients", deleteIngredientQuery)
ingredientRouter.delete("/api/ingredients/:ingredient_id", deleteIngredient)