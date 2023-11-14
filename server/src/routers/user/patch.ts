import { User } from "../../models/userModel.js";

/**
 * Manejador de la petición PATCH /users
 * Se debe dar el username por query
 * Se debe proporcionar un body con los datos del nuevo reto
 * @param req Request
 * @param res Response
 * @returns Response
 */
export const patchUserQuery =  async (req: any, res: any) => {
  if (!req.query.username) {
    return res.status(400).send({ msg: 'Se debe proporcionar un nombre de usuario' });
  }

  try {
    const allowedUpdates = ["first_name", "last_name", "profile_description", "profile_picture", "email", "recipes", "favorites_recipes", "friends"];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({ msg: "Los parámetros seleccionados no se puede modificar"});
    }

    // Usuario antes de ser modificado
    const userActual = await User.findOne({ username: req.query.username });
    
    // Usuario después de ser modificado
    const user = await User.findOneAndUpdate({ username: req.query.username }, req.body, { new: true, runValidators: true, });
    
 
    const userActualizado = await User.findOne({username: req.query.username});

    if (userActualizado) {
      return res.status(200).send(userActualizado);
    }
    return res.status(404).send({msg: "El usuario no se actualizó correctamente"});
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
export const patchUser = async (req: any, res: any) => {
  if (!req.params.username) {
    return res.status(400).send({ msg: 'Se debe proporcionar un nombre de usuario' });
  }
  try {
    const allowedUpdates = ["first_name", "last_name", "profile_description", "profile_picture", "email", "recipes", "favorites_recipes", "friends"];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
      return res.status(400).send({ msg: "Los parámetros seleccionados no se puede modificar"});
    }

    // Usuario antes de ser modificado
    const userActual = await User.findOne({ username: req.params.username });

    // Usuario después de ser modificado
    const user = await User.findOneAndUpdate({ username: req.params.username }, req.body, { new: true, runValidators: true, });


    const userActualizado = await User.findOne({username: req.params.username});

    if (userActualizado) {
      return res.send(userActualizado);
    }
    return res.status(404).send({msg: "El usuario no se actualizó correctamente"});

  } catch (error) {
    return res.status(500).send({msg: "Fallo en el servidor al actualizar", error});
  }
};