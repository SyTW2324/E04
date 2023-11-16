import { Schema } from 'mongoose';

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  profile_description: string;
  profile_picture: string;
  email: string;
  // password: string;
  recipes: Schema.Types.ObjectId[];
  favorites_recipes: Schema.Types.ObjectId[];
  friends: Schema.Types.ObjectId[];
}