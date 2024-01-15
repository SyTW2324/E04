import { Schema } from 'mongoose';

export interface Recipe {
  map(arg0: (recipe: any) => import("react").JSX.Element): import("react").ReactNode;
  recipe_id: Schema.Types.ObjectId;
  title: string;
  category: Schema.Types.ObjectId;
  ingredients: Schema.Types.ObjectId[]
  instructions: string[];
  images: string[];
  time: number;
  number_servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  interactions: Schema.Types.ObjectId[];
}