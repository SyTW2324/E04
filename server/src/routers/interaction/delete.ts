import { Interaction } from "../../models/interactionModel.js";

/**
 * Manejador de la petición DELETE /users
 * Se debe pasar el username por query
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const deleteInteractionQuery =  async (req: any, res: any) => {
  if (!req.query.interaction_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de interacción' });
  }
   try {
    const interaction = await Interaction.findOne({interaction_id: req.query.interaction_id.toString()});
     if (!interaction) {
      return res.status(404).send({ msg: 'Receta no encontrada' });
    }

    // await Interaction.updateMany( { friends: interaction._id }, { $pull: { friends: interaction._id }});

    await Interaction.findByIdAndDelete(interaction._id);
    return res.status(200).send(interaction);
  } catch (error) {
    return res.status(500).send({ msg: 'Fallo en el servidor al eliminar la interacción', error});
  }
};
  
/**
 * Manejador de la petición DELETE /users
 * Se debe pasar el username por params
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const deleteInteraction =  async (req: any, res: any) => {
  if (!req.params.interaction_id) {
    return res.status(400).send({ msg: 'Se debe proporcionar un identificador de la interacción' });
  }

  try {
    const interaction = await Interaction.findOne({interaction_id: req.params.interaction_id.toString()});

    if (!interaction) {
      return res.status(404).send({ msg: 'Receta no encontrada' });
    }

    // await Interaction.updateMany( { friends: user._id }, { $pull: { friends: user._id }});

    await Interaction.findByIdAndDelete(interaction._id);
    return res.status(200).send(interaction);
  } catch (error) {
    return res.status(500).send({ msg: 'Fallo en el servidor al eliminar la interacción', error});
  }
};
  