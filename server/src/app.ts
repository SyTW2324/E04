import express from 'express';
import './db/mongoose.js';
import { userRouter } from './routers/userRouter.js';
import { recipeRouter } from './routers/recipeRouter.js';

/**
 * @description Esta es la aplicacion de express
 * @type {Express}
 */
export const app = express();

app.use(express.json());

app.use(userRouter);
app.use(recipeRouter);