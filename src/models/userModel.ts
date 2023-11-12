import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

export interface UserDocumentInterface extends Document {
  username: string;
  first_name: string;
  last_name: string;
  description: string;
  profile_picture: string;
  email: string;
  password: string;
  recipes: string[];
  favorites_recipes: string[];
  friends: string[];
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
});

export const User = model<UserDocumentInterface>('User', UserSchema);