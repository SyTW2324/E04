import { Schema } from 'mongoose';

export interface Interaction {  
  interaction_id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  score: 0 | 1 | 2 | 3 | 4 | 5;
  comment: string;
}