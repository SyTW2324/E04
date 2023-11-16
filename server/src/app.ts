import express from 'express';
import './db/mongoose.js';
import { userRouter } from './routers/userRouter.js';
import { recipeRouter } from './routers/recipeRouter.js';
import { categoryRouter } from './routers/categoryRouter.js';
import { ingredientRouter } from './routers/ingredientRouter.js';
import { interactionRouter } from './routers/interactionRouter.js';

/**
 * @description Esta es la aplicacion de express
 * @type {Express}
 */
export const app = express();


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173'); // Reemplaza con la URL de tu aplicación React
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

app.use(userRouter);
app.use(recipeRouter);
app.use(categoryRouter);
app.use(ingredientRouter);
app.use(interactionRouter);