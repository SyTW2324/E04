import { Schema } from "mongoose";
import mongoose from "mongoose";
import { Interaction } from "../../models/interactionModel.js";

/**
 * Manejador de la petición GET /users
 * Se debe dar el username por query
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const getInteractionQuery =  async (req: any, res: any) => {
  try {
    const filter = req.query.interaction_id ? {interaction_id: req.query.interaction_id.toString()} : {};

    const interactions = await Interaction.find(filter);

    if (interactions.length !== 0) {
      return res.status(200).send(interactions);
    }
    return res.status(404).send({msg: "Interacción no encontrada"});
  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al buscar una interacción", error});
  }
};

/**
 * Manejador de la petición GET /users
 * Se debe dar el username por params
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const getInteraction =  async (req: any, res: any) => {

  try {

    const filter = req.params.interaction_id ? {interaction_id: new mongoose.Types.ObjectId(req.params.interaction_id)} : {};

    const interactions = await Interaction.find(filter);

    if (interactions.length !== 0) {
      return res.status(200).send(interactions);
    }
    return res.status(404).send({msg: "Interacción no encontrada"});
  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al buscar una interacción", error});
  }
};