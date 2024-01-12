import express from "express";

import { postRecipe } from "../routers/recipe/post.js";
import { getRecipeQuery, getRecipe } from "../routers/recipe/get.js";
import { patchRecipeQuery, patchRecipe } from "./recipe/patch.js";
import { deleteRecipeQuery, deleteRecipe } from "./recipe/delete.js";
import { verifyToken } from "./verifyToken.js";

export const recipeRouter = express.Router();

recipeRouter.post("/api/recipes", verifyToken, postRecipe)
recipeRouter.get("/api/recipes", getRecipeQuery)
recipeRouter.get("/api/recipes/:recipe_id", getRecipe)
recipeRouter.patch("/api/recipes", verifyToken, patchRecipeQuery)
recipeRouter.patch("/api/recipes/:recipe_id", verifyToken, patchRecipe)
recipeRouter.delete("/api/recipes", verifyToken, deleteRecipeQuery)
recipeRouter.delete("/api/recipes/:username", verifyToken, deleteRecipe)