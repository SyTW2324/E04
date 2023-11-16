import { Schema } from 'mongoose';

export interface Category {
  ingredient_id: Schema.Types.ObjectId;
  ingredient: string;
  unitOfMeasurement: 'gr' | 'cl';
  description: string;
}
