import { Recipe } from "../../models/recipeModel.js";

/**
 * Manejador de la petición PATCH /users
 * Se debe dar el username por query
 * Se debe proporcionar un body con los datos del nuevo reto
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const patchRecipeQuery =  async (req: any, res: any) => {
  if (!req.query.recipe_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de receta' });
  }

  try {
    const allowedUpdates = ["recipe_id"];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({ msg: "Los parámetros seleccionados no se puede modificar"});
    }

    // Receta antes de ser modificado
    const currentRecipe = await Recipe.findOne({ recipe_id: req.query.recipe_id });
    
    // Receta después de ser modificado
    const recipe = await Recipe.findOneAndUpdate({ recipe_id: req.query.recipe_id }, req.body, { new: true, runValidators: true, });
    
 
    const updatedRecipe = await Recipe.findOne({recipe_id: req.query.recipe_id});

    if (updatedRecipe) {
      return res.status(200).send(updatedRecipe);
    }
    return res.status(404).send({msg: "La receta no se actualizó correctamente"});
  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al actualizar", error});
  }
};

/**
 * Manejador de la petición PATCH /users
 * Se debe dar el id por params
 * Se debe proporcionar un body con los datos del nuevo reto
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const patchRecipe = async (req: any, res: any) => {
  if (!req.params.recipe_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de receta' });
  }
  try {
    const allowedUpdates = ["recipe_id"];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({ msg: "Los parámetros seleccionados no se puede modificar"});
    }

    // Receta antes de ser modificado
    const currentRecipe = await Recipe.findOne({ recipe_id: req.params.recipe_id });

    // Usuario después de ser modificado
    const recipe = await Recipe.findOneAndUpdate({ recipe_id: req.params.recipe_id }, req.body, { new: true, runValidators: true, });


    const updatedRecipe = await Recipe.findOne({recipe_id: req.params.recipe_id});

    if (updatedRecipe) {
      return res.send(updatedRecipe);
    }
    return res.status(404).send({msg: "La receta no se actualizó correctamente"});

  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al actualizar", error});
  }
};