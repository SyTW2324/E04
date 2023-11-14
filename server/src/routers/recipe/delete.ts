import { Recipe } from "../../models/recipeModel.js";

/**
 * Manejador de la petición DELETE /users
 * Se debe pasar el username por query
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const deleteRecipeQuery =  async (req: any, res: any) => {
  if (!req.query.recipe_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de receta' });
  }
   try {
    const recipe = await Recipe.findOne({recipe_id: req.query.recipe_id.toString()});
     if (!recipe) {
      return res.status(404).send({ msg: 'Receta no encontrada' });
    }

    // await Recipe.updateMany( { friends: recipe._id }, { $pull: { friends: recipe._id }});

    await Recipe.findByIdAndDelete(recipe._id);
    return res.status(200).send(recipe);
  } catch (error) {
    return res.status(500).send({ msg: 'Fallo en el servidor al eliminar la receta', error});
  }
};
  
/**
 * Manejador de la petición DELETE /users
 * Se debe pasar el username por params
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const deleteRecipe =  async (req: any, res: any) => {
  if (!req.params.recipe_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de receta' });
  }

  try {
    const recipe = await Recipe.findOne({recipe_id: req.params.recipe_id.toString()});

    if (!recipe) {
      return res.status(404).send({ msg: 'Receta no encontrada' });
    }

    // await Recipe.updateMany( { friends: user._id }, { $pull: { friends: user._id }});

    await Recipe.findByIdAndDelete(recipe._id);
    return res.status(200).send(recipe);
  } catch (error) {
    return res.status(500).send({ msg: 'Fallo en el servidor al eliminar la receta', error});
  }
};
  