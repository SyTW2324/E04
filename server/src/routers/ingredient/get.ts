import { Schema } from "mongoose";
import mongoose from "mongoose";
import { Ingredient } from "../../models/ingredientModel.js";

/**
 * Manejador de la petición GET /users
 * Se debe dar el username por query
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const getIngredientQuery =  async (req: any, res: any) => {
  try {
    const filter = req.query.ingredient_id ? {ingredient_id: req.query.ingredient_id.toString()} : {};

    const ingredients = await Ingredient.find(filter);

    if (ingredients.length !== 0) {
      return res.status(200).send(ingredients);
    }
    return res.status(404).send({msg: "Ingrediente no encontrado"});
  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al buscar un ingrediente", error});
  }
};

/**
 * Manejador de la petición GET /users
 * Se debe dar el username por params
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const getIngredient =  async (req: any, res: any) => {

  try {

    const filter = req.params.ingredient_id ? {ingredient_id: new mongoose.Types.ObjectId(req.params.ingredient_id)} : {};

    const ingredients = await Ingredient.find(filter);

    if (ingredients.length !== 0) {
      return res.status(200).send(ingredients);
    }
    return res.status(404).send({msg: "Ingrediente no encontrado"});
  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al buscar un ingrediente", error});
  }
};