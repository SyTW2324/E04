import { Interaction } from "../../models/interactionModel.js";

/**
 * Manejador de la petición PATCH /users
 * Se debe dar el username por query
 * Se debe proporcionar un body con los datos del nuevo reto
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const patchInteractionQuery =  async (req: any, res: any) => {
  if (!req.query.interaction_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de la interacción' });
  }
  
  try {
    const allowedUpdates = ["user", "score", "comment"];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({ msg: "Los parámetros seleccionados no se puede modificar"});
    }

    // Receta antes de ser modificado
    const currentInteraction = await Interaction.findOne({ interaction_id: req.query.interaction_id });
    
    // Receta después de ser modificado
    const interaction = await Interaction.findOneAndUpdate({ interaction_id: req.query.interaction_id }, req.body, { new: true, runValidators: true, });
    
 
    const updatedInteraction = await Interaction.findOne({interaction_id: req.query.interaction_id});

    if (updatedInteraction) {
      return res.status(200).send(updatedInteraction);
    }
    return res.status(404).send({msg: "La interacción no se actualizó correctamente"});
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
export const patchInteraction = async (req: any, res: any) => {
  if (!req.params.interaction_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de receta' });
  }
  try {
    const allowedUpdates = ["user", "score", "comment"];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({ msg: "Los parámetros seleccionados no se puede modificar"});
    }

    // Receta antes de ser modificado
    const currentInteraction = await Interaction.findOne({ interaction_id: req.params.interaction_id });

    // Usuario después de ser modificado
    const interaction = await Interaction.findOneAndUpdate({ interaction_id: req.params.interaction_id }, req.body, { new: true, runValidators: true, });


    const updatedInteraction = await Interaction.findOne({interaction_id: req.params.interaction_id});

    if (updatedInteraction) {
      return res.send(updatedInteraction);
    }
    return res.status(404).send({msg: "La interacción no se actualizó correctamente"});

  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al actualizar", error});
  }
};


