import { Ingredient } from "../../models/ingredientModel.js";
/**
 * Manejador de la petición POST /users
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const postIngredient = async (req: any, res: any) => {
  try {
    const ingredient = new Ingredient(req.body);
    await ingredient.save();
    return res.status(201).send(ingredient);
  } catch (error) {
    return res.status(500).send({msg: "No se añadió correctamente el ingrediente", error: error});
  }
};