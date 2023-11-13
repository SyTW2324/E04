import { User } from "../../models/userModel.js";
/**
 * Manejador de la petición POST /users
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const postUser = async (req: any, res: any) => {
  try {
    const user = new User(req.body);
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({msg: "No se añadió correctamente el usuario", error: error});
  }
};