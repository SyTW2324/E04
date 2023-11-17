import { Image } from "../../models/imageModel.js";
/**
 * Manejador de la petición POST /users
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const postImage = async (req: any, res: any) => {
  try {
    const image = new Image();
    image.imageTitle = req.body.title;
    image.image.data = req.files.file.data;
    image.image.contentType = req.files.file.mimetype;

    await image.save();
    return res.status(201).send(image);
  } catch (error) {
    return res.status(500).send({msg: "No se añadió correctamente la imagen", error: error});
  }
};