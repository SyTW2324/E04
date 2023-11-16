import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

export interface CategoryDocumentInterface extends Document {
  ingredient_id: Schema.Types.ObjectId;
  ingredient: string;
  unitOfMeasurement: 'gr' | 'cl';
  description: string;
}


const CategorySchema = new Schema<CategoryDocumentInterface>({
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
  unitOfMeasurement: {
    type: String,
    required: true,
    trim: true,
    enum: ['gr', 'cl'],
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
  },
});


export const Category = model<CategoryDocumentInterface>('Category', CategorySchema);