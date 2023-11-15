import { Category } from "../../models/categoryModel.js";

/**
 * Manejador de la petición PATCH /users
 * Se debe dar el username por query
 * Se debe proporcionar un body con los datos del nuevo reto
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const patchCategoryQuery =  async (req: any, res: any) => {
  if (!req.query.category_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de receta' });
  }
  
  try {
    const allowedUpdates = ["category", "description"];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({ msg: "Los parámetros seleccionados no se puede modificar"});
    }

    // Receta antes de ser modificado
    const currentCategory = await Category.findOne({ category_id: req.query.category_id });
    
    // Receta después de ser modificado
    const category = await Category.findOneAndUpdate({ category_id: req.query.category_id }, req.body, { new: true, runValidators: true, });
    
 
    const updatedCategory = await Category.findOne({category_id: req.query.category_id});

    if (updatedCategory) {
      return res.status(200).send(updatedCategory);
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
export const patchCategory = async (req: any, res: any) => {
  if (!req.params.category_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de receta' });
  }
  try {
    const allowedUpdates = ["category", "description"];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({ msg: "Los parámetros seleccionados no se puede modificar"});
    }

    // Receta antes de ser modificado
    const currentCategory = await Category.findOne({ category_id: req.params.category_id });

    // Usuario después de ser modificado
    const category = await Category.findOneAndUpdate({ category_id: req.params.category_id }, req.body, { new: true, runValidators: true, });


    const updatedCategory = await Category.findOne({category_id: req.params.category_id});

    if (updatedCategory) {
      return res.send(updatedCategory);
    }
    return res.status(404).send({msg: "La receta no se actualizó correctamente"});

  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al actualizar", error});
  }
};


