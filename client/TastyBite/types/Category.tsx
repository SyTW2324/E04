import { Schema } from 'mongoose';

export interface CategoryInterface {
  ingredient_id: Schema.Types.ObjectId;
  ingredient: string;
  unitOfMeasurement: 'gr' | 'cl';
  description: string;
}
