import { Schema } from "mongoose";
import mongoose from "mongoose";
import { Image } from "../../models/imageModel.js";

/**
 * Manejador de la petición GET /users
 * Se debe dar el username por query
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const getImageQuery =  async (req: any, res: any) => {
  try {
    const image = await Image.findById(req.query.imageId);

    if(image !== null) {
      res.set('Content-Type', image.image.contentType)
      return res.status(200).send(image.image.data);
    }

    return res.status(404).send({msg: "Imagen no encontrada"});
  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al buscar una imagen", error});
  }
};

/**
 * Manejador de la petición GET /users
 * Se debe dar el username por params
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const getImage =  async (req: any, res: any) => {

  try {
    const image = await Image.findById(req.params.imageId);

    if(image !== null) {
      res.set('Content-Type', image.image.contentType)
      return res.status(200).send(image.image.data);
    }

    return res.status(404).send({msg: "Imagen no encontrada"});
  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al buscar una imagen", error});
  }
};