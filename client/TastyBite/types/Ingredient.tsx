import { Schema } from 'mongoose';

export interface Ingredient {
  ingredient_id: Schema.Types.ObjectId;
  ingredient: string;
  description: string;
  image: string;
}
