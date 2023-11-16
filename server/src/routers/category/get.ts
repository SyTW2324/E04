import { Schema } from "mongoose";
import mongoose from "mongoose";
import { Category } from "../../models/categoryModel.js";

/**
 * Manejador de la petición GET /users
 * Se debe dar el username por query
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const getCategoryQuery =  async (req: any, res: any) => {
  try {
    const filter = req.query.category_id ? {category_id: req.query.category_id.toString()} : {};

    const categories = await Category.find(filter);

    if (categories.length !== 0) {
      return res.status(200).send(categories);
    }
    return res.status(404).send({msg: "Categoría no encontrada"});
  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al buscar una categoría", error});
  }
};

/**
 * Manejador de la petición GET /users
 * Se debe dar el username por params
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const getCategory =  async (req: any, res: any) => {

  try {

    const filter = req.params.category_id ? {category_id: new mongoose.Types.ObjectId(req.params.category_id)} : {};

    const categories = await Category.find(filter);

    if (categories.length !== 0) {
      return res.status(200).send(categories);
    }
    return res.status(404).send({msg: "Categoría no encontrada"});
  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al buscar una receta", error});
  }
};