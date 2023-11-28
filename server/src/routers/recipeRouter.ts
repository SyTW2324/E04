import express from "express";

import { postRecipe } from "../routers/recipe/post.js";
import { getRecipeQuery, getRecipe } from "../routers/recipe/get.js";
import { patchRecipeQuery, patchRecipe } from "./recipe/patch.js";
import { deleteRecipeQuery, deleteRecipe } from "./recipe/delete.js";

export const recipeRouter = express.Router();

recipeRouter.post("/api/recipes", postRecipe)
recipeRouter.get("/api/recipes", getRecipeQuery)
recipeRouter.get("/api/recipes/:recipe_id", getRecipe)
recipeRouter.patch("/api/recipes", patchRecipeQuery)
recipeRouter.patch("/api/recipes/:recipe_id", patchRecipe)
recipeRouter.delete("/api/recipes", deleteRecipeQuery)
recipeRouter.delete("/api/recipes/:username", deleteRecipe)