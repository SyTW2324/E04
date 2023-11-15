import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

export interface CategoryDocumentInterface extends Document {
  category_id: Schema.Types.ObjectId;
  category: string;
  description: string;
}


const CategorySchema = new Schema<CategoryDocumentInterface>({
  category_id: {
    type: Schema.Types.ObjectId,
    default: function() {
      return this._id;
    },
    unique: true,
    immutable: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: ['Saludables', 'Gourmet', 'Vegetarianas', 'Ocasiones especiales', 'Económicas'],
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