import { Image } from "../../models/imageModel.js";

/**
 * Manejador de la petición PATCH /users
 * Se debe dar el username por query
 * Se debe proporcionar un body con los datos del nuevo reto
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const patchImageQuery =  async (req: any, res: any) => {
  if (!req.query.image_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de la imagen' });
  }
  
  try {
    const allowedUpdates = ["imageTitle", "imageUrl"];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({ msg: "Los parámetros seleccionados no se puede modificar"});
    }

    // Receta antes de ser modificado
    const currentImage = await Image.findOne({ image_id: req.query.image_id });
    
    // Receta después de ser modificado
    const image = await Image.findOneAndUpdate({ image_id: req.query.image_id }, req.body, { new: true, runValidators: true, });
    
 
    const updatedImage = await Image.findOne({image_id: req.query.image_id});

    if (updatedImage) {
      return res.status(200).send(updatedImage);
    }
    return res.status(404).send({msg: "La imagen no se actualizó correctamente"});
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
export const patchImage = async (req: any, res: any) => {
  if (!req.params.image_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de la imagen' });
  }
  try {
    
    const allowedUpdates = ["imageTitle", "imageUrl"];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({ msg: "Los parámetros seleccionados no se puede modificar"});
    }

    // Receta antes de ser modificado
    const currentImage = await Image.findOne({ image_id: req.params.image_id });

    // Usuario después de ser modificado
    const image = await Image.findOneAndUpdate({ image_id: req.params.image_id }, req.body, { new: true, runValidators: true, });


    const updatedImage = await Image.findOne({image_id: req.params.image_id});

    if (updatedImage) {
      return res.send(updatedImage);
    }
    return res.status(404).send({msg: "La imagen no se actualizó correctamente"});

  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al actualizar", error});
  }
};
