import { Document, Schema, model } from 'mongoose';
import validator from 'validator';
import mongoose from 'mongoose';
import { ImageDocumentInterface } from './imageModel.js';

export interface RecipeDocumentInterface extends Document {
  recipe_id: Schema.Types.ObjectId;
  title: string;
  category: Schema.Types.ObjectId;
  ingredients: Schema.Types.ObjectId[]
  instructions: string[];
  images: Schema.Types.ObjectId[];
  time: number;
  number_servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  interactions: Schema.Types.ObjectId[];
}

const RecipeSchema = new Schema<RecipeDocumentInterface>({
  recipe_id: {
    type: Schema.Types.ObjectId,
    default: function() {
      return this._id;
    },
    unique: true,
    immutable: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (value.length > 100) {
        throw new Error('Title is too long');
      }
    },
  },
  category: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Category',
  },
  ingredients: [{
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'Ingredient',
  }],
  instructions: [{
    type: String,
    required: false,
    validate: (value: string) => {
      if (value.length > 1000) {
        throw new Error('Instruction is too long');
      }
    },
  }],
  images: [{
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: false,
  }],
  time: {
    type: Number,
    required: false,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error('Time must be a positive number');
      }
    },
  },
  number_servings: {
    type: Number,
    required: false,
    validate: (value: number) => {
      if (value < 0) {
        throw new Error('Number of servings must be a positive number');
      }
    },
  },
  difficulty: {
    type: String,
    required: false,
    enum: ['easy', 'medium', 'hard'],
  },
  interactions: [{
    type: Schema.Types.ObjectId,
    required: false,
  }]
});



export const Recipe = model<RecipeDocumentInterface>('Recipe', RecipeSchema);