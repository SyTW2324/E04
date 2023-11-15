import { Document, Schema, model } from 'mongoose';
import validator from 'validator';

export interface InteractionDocumentInterface extends Document {
  interaction_id: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  score: 0 | 1 | 2 | 3 | 4 | 5;
  comment: string;
}


const InteractionSchema = new Schema<InteractionDocumentInterface>({
  interaction_id: {
    type: Schema.Types.ObjectId,
    default: function() {
      return this._id;
    },
    unique: true,
    immutable: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: {
    enum: [0, 1, 2, 3, 4, 5],
  },
  comment: {
    type: String,
    validate: (value: string) => {
      if (value.length > 300) {
        throw new Error('Comment is too long');
      }
    },
  }
});100


export const Interaction = model<InteractionDocumentInterface>('Interaction', InteractionSchema);