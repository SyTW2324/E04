import { Ingredient } from "../../models/ingredientModel.js";

/**
 * Manejador de la petición DELETE /users
 * Se debe pasar el username por query
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const deleteIngredientQuery =  async (req: any, res: any) => {
  if (!req.query.ingredient_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de ingrediente' });
  }
   try {
    const ingredient = await Ingredient.findOne({ingredient_id: req.query.ingredient_id.toString()});
     if (!ingredient) {
      return res.status(404).send({ msg: 'Ingrediente no encontrado' });
    }

    // await Category.updateMany( { friends: category._id }, { $pull: { friends: category._id }});

    await Ingredient.findByIdAndDelete(ingredient._id);
    return res.status(200).send(ingredient);
  } catch (error) {
    return res.status(500).send({ msg: 'Fallo en el servidor al eliminar el ingrediente', error});
  }
};
  
/**
 * Manejador de la petición DELETE /users
 * Se debe pasar el username por params
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const deleteIngredient =  async (req: any, res: any) => {
  if (!req.params.ingredient_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de ingrediente' });
  }

  try {
    const ingredient = await Ingredient.findOne({ingredient_id: req.params.ingredient_id.toString()});

    if (!ingredient) {
      return res.status(404).send({ msg: 'Ingrediente no encontrado' });
    }

    // await Category.updateMany( { friends: user._id }, { $pull: { friends: user._id }});

    await Ingredient.findByIdAndDelete(ingredient._id);
    return res.status(200).send(ingredient);
  } catch (error) {
    return res.status(500).send({ msg: 'Fallo en el servidor al eliminar el ingrediente', error});
  }
};
  