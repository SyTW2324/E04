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
    await user.save();
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send({msg: "No se añadió correctamente el usuario", error: error});
  }
};



import jwt from 'jsonwebtoken';
// const TOKEN_KEY = process.env.TOKEN_KEY || '';

const TOKEN_KEY = "x4TvnErxRETbVcqaL15dqM1115eN1p5y";


export const postUserLogin = async (req: any, res: any) => {
  try {
    const usernameLogin = req.body.username;
    const passwordLogin = req.body.password;
    
    const filter = req.body.username ? {username: req.body.username.toString()} : {};

    const users = await User.find(filter);
    

    if (users.length !== 0) {
      const user = users[0];
      if(user.username === usernameLogin && user.password === passwordLogin) {
        const token = jwt.sign({ username: user.username, email: user.email}, TOKEN_KEY, { expiresIn: '1h'});
        let nDatos = { username: user.username, first_name: user.first_name, last_name: user.last_name, profile_description: user.profile_description,
          profile_picture: user.profile_picture, email: user.email, recipes: user.recipes, 
          favorites_recipes: user.favorites_recipes, friends: user.friends, token};
        return res.status(200).json(nDatos);
      }
    }

    
    

    // const user = new User(req.body);
    // await user.save();
    // return res.status(201).send(user);
    return res.status(400).send("Inicio de sesión incorrecto");
  } catch (error) {
    return res.status(500).send({msg: "No se inició sesión correctamente", error: error});
  }
};

