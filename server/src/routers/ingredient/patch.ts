import { Ingredient } from "../../models/ingredientModel.js";

/**
 * Manejador de la petición PATCH /users
 * Se debe dar el username por query
 * Se debe proporcionar un body con los datos del nuevo reto
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const patchIngredientQuery =  async (req: any, res: any) => {
  if (!req.query.ingredient_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de ingrediente' });
  }
  
  try {
    const allowedUpdates = ["ingredient","description","image"];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({ msg: "Los parámetros seleccionados no se puede modificar"});
    }

    // Receta antes de ser modificado
    const currentIngredient = await Ingredient.findOne({ ingredient_id: req.query.ingredient_id });
    
    // Receta después de ser modificado
    const ingredient = await Ingredient.findOneAndUpdate({ ingredient_id: req.query.ingredient_id }, req.body, { new: true, runValidators: true, });
    
 
    const updatedIngredient = await Ingredient.findOne({ingredient_id: req.query.ingredient_id});

    if (updatedIngredient) {
      return res.status(200).send(updatedIngredient);
    }
    return res.status(404).send({msg: "El ingrediente no se actualizó correctamente"});
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
export const patchIngredient = async (req: any, res: any) => {
  if (!req.params.ingredient_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de ingrediente' });
  }
  try {
    const allowedUpdates = ["ingredient","description","image"];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({ msg: "Los parámetros seleccionados no se puede modificar"});
    }

    // Receta antes de ser modificado
    const currentIngredient = await Ingredient.findOne({ ingredient_id: req.params.ingredient_id });

    // Usuario después de ser modificado
    const ingredient = await Ingredient.findOneAndUpdate({ ingredient_id: req.params.ingredient_id }, req.body, { new: true, runValidators: true, });


    const updatedIngredient = await Ingredient.findOne({ingredient_id: req.params.ingredient_id});

    if (updatedIngredient) {
      return res.send(updatedIngredient);
    }
    return res.status(404).send({msg: "El ingrediente no se actualizó correctamente"});

  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al actualizar", error});
  }
};
