import { Recipe } from "../../models/recipeModel.js";
/**
 * Manejador de la petición POST /users
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const postRecipe = async (req: any, res: any) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    return res.status(201).send(recipe);
  } catch (error) {
    return res.status(500).send({msg: "No se añadió correctamente la receta", error: error});
  }
};