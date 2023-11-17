import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

export interface UserDocumentInterface extends Document {
  username: string;
  first_name: string;
  last_name: string;
  profile_description: string;
  profile_picture: Schema.Types.ObjectId;
  email: string;
  // password: string;
  recipes: Schema.Types.ObjectId[];
  favorites_recipes: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<UserDocumentInterface>({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!validator.default.isAlphanumeric(value)) {
        throw new Error('Solo se aceptan caracteres alfanuméricos');
      }
    }
  },
  first_name: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!validator.default.isAlpha(value)) {
        throw new Error('Solo se aceptan caracteres alfabéticos');
      }
    }
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value: string) => {
        // Use a regex to allow letters and spaces
        const regex = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
        return regex.test(value);
      },
      message: 'Solo se aceptan caracteres alfabéticos con espacios opcionales para uno o dos apellidos.',
    },
  },
  profile_description: {
    type: String
  },
  profile_picture: {
    type: Schema.Types.ObjectId,
    ref: 'Image',
    required: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!validator.default.isEmail(value)) {
        throw new Error('Email inválido');
      }
    }
  },
  // password
  recipes: [{
    type: Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  favorites_recipes: [{
    type: Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});


export const User = model<UserDocumentInterface>('User', UserSchema);