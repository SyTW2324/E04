import { Category } from "../../models/categoryModel.js";

/**
 * Manejador de la petición DELETE /users
 * Se debe pasar el username por query
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const deleteCategoryQuery =  async (req: any, res: any) => {
  if (!req.query.category_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de receta' });
  }
   try {
    const category = await Category.findOne({category_id: req.query.category_id.toString()});
     if (!category) {
      return res.status(404).send({ msg: 'Receta no encontrada' });
    }

    // await Category.updateMany( { friends: category._id }, { $pull: { friends: category._id }});

    await Category.findByIdAndDelete(category._id);
    return res.status(200).send(category);
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
export const deleteCategory =  async (req: any, res: any) => {
  if (!req.params.category_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de receta' });
  }

  try {
    const category = await Category.findOne({category_id: req.params.category_id.toString()});

    if (!category) {
      return res.status(404).send({ msg: 'Receta no encontrada' });
    }

    // await Category.updateMany( { friends: user._id }, { $pull: { friends: user._id }});

    await Category.findByIdAndDelete(category._id);
    return res.status(200).send(category);
  } catch (error) {
    return res.status(500).send({ msg: 'Fallo en el servidor al eliminar la receta', error});
  }
};
  