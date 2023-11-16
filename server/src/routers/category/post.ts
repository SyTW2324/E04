import { Category } from "../../models/categoryModel.js";
/**
 * Manejador de la petición POST /users
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const postCategory = async (req: any, res: any) => {
  try {
    const category = new Category(req.body);
    await category.save();
    return res.status(201).send(category);
  } catch (error) {
    return res.status(500).send({msg: "No se añadió correctamente la categoría", error: error});
  }
};