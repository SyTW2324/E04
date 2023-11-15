import express from "express";

import { postIngredient } from "../routers/ingredient/post.js";
import { getIngredientQuery, getIngredient } from "../routers/ingredient/get.js";
import { patchIngredientQuery, patchIngredient } from "./ingredient/patch.js";
import { deleteIngredientQuery, deleteIngredient } from "./ingredient/delete.js";

export const ingredientRouter = express.Router();

ingredientRouter.post("/ingredients", postIngredient)
ingredientRouter.get("/ingredients", getIngredientQuery)
ingredientRouter.get("/ingredients/:ingredient_id", getIngredient)
ingredientRouter.patch("/ingredients", patchIngredientQuery)
ingredientRouter.patch("/ingredients/:ingredient_id", patchIngredient)
ingredientRouter.delete("/ingredients", deleteIngredientQuery)
ingredientRouter.delete("/ingredients/:ingredient_id", deleteIngredient)