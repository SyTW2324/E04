import { Schema } from "mongoose";
import mongoose from "mongoose";
import { Recipe } from "../../models/recipeModel.js";
import { Ingredient } from "../../models/ingredientModel.js";

/**
 * Manejador de la petición GET /users
 * Se debe dar el username por query
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const getRecipeQuery =  async (req: any, res: any) => {
  try {
    let filter = {};
    if (req.query.recipe_id) {
      filter = {recipe_id: req.query.recipe_id.toString()};

    } else if (req.query.category_id) {
      filter = {category: req.query.category_id.toString()};
    }

    const recipes = await Recipe.find(filter).populate('category').populate('ingredients').populate('images').limit(10);

    if (recipes.length !== 0) {
      return res.status(200).send(recipes);
    }
    return res.status(404).send({msg: "Receta no encontrada"});
  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al buscar una receta", error});
  }
};

/**
 * Manejador de la petición GET /users
 * Se debe dar el username por params
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const getRecipe =  async (req: any, res: any) => {

  try {

    const filter = req.params.recipe_id ? {recipe_id: new mongoose.Types.ObjectId(req.params.recipe_id)} : {};

    const recipes = await Recipe.find(filter).populate('category').populate('ingredients').populate('images').limit(10);

    if (recipes.length !== 0) {
      return res.status(200).send(recipes);
    }
    return res.status(404).send({msg: "Receta no encontrada"});
  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al buscar una receta", error});
  }
};