import { Image } from "../../models/imageModel.js";

/**
 * Manejador de la petición DELETE /users
 * Se debe pasar el username por query
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const deleteImageQuery =  async (req: any, res: any) => {
  if (!req.query.image_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de la imagen' });
  }
   try {
    const image = await Image.findOne({image_id: req.query.image_id.toString()});
     if (!image) {
      return res.status(404).send({ msg: 'Imagen no encontrada' });
    }

    // await Category.updateMany( { friends: category._id }, { $pull: { friends: category._id }});

    await Image.findByIdAndDelete(image._id);
    return res.status(200).send(image);
  } catch (error) {
    return res.status(500).send({ msg: 'Fallo en el servidor al eliminar la imagen', error});
  }
};
  
/**
 * Manejador de la petición DELETE /users
 * Se debe pasar el username por params
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const deleteImage =  async (req: any, res: any) => {
  if (!req.params.image_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de imagen' });
  }

  try {
    const image = await Image.findOne({image_id: req.params.image_id.toString()});

    if (!image) {
      return res.status(404).send({ msg: 'Imagen no encontrado' });
    }

    // await Category.updateMany( { friends: user._id }, { $pull: { friends: user._id }});

    await Image.findByIdAndDelete(image._id);
    return res.status(200).send(image);
  } catch (error) {
    return res.status(500).send({ msg: 'Fallo en el servidor al eliminar la imagen', error});
  }
};
  