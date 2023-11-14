import express from "express";

import { postRecipe } from "../routers/recipe/post.js";
import { getRecipeQuery, getRecipe } from "../routers/recipe/get.js";
import { patchRecipeQuery, patchRecipe } from "./recipe/patch.js";
import { deleteRecipeQuery, deleteRecipe } from "./recipe/delete.js";

export const recipeRouter = express.Router();

recipeRouter.post("/recipes", postRecipe)
recipeRouter.get("/recipes", getRecipeQuery)
recipeRouter.get("/recipes/:recipe_id", getRecipe)
recipeRouter.patch("/recipes", patchRecipeQuery)
recipeRouter.patch("/recipes/:recipe_id", patchRecipe)
recipeRouter.delete("/recipes", deleteRecipeQuery)
recipeRouter.delete("/recipes/:username", deleteRecipe)