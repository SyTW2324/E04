import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

export interface IngredientDocumentInterface extends Document {
  ingredient_id: Schema.Types.ObjectId;
  ingredient: string;
  description: string;
}


const IngredientSchema = new Schema<IngredientDocumentInterface>({
  ingredient_id: {
    type: Schema.Types.ObjectId,
    default: function() {
      return this._id;
    },
    unique: true,
    immutable: true,
  },
  ingredient: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (value.length > 100) {
        throw new Error('Description is too long');
      }
    },
  }
});


export const Ingredient = model<IngredientDocumentInterface>('Ingredient', IngredientSchema);