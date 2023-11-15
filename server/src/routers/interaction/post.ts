import { Interaction } from "../../models/interactionModel.js";
/**
 * Manejador de la petición POST /users
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const postInteraction = async (req: any, res: any) => {
  try {
    const interaction = new Interaction(req.body);
    await interaction.save();
    return res.status(201).send(interaction);
  } catch (error) {
    return res.status(500).send({msg: "No se añadió correctamente la interacción", error: error});
  }
};