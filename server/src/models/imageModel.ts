import { Document, Schema, model } from 'mongoose';

export interface ImageDocumentInterface extends Document {
  imageId: Schema.Types.ObjectId;
  imageTitle: string;
  image: {
    data: Buffer;
    contentType: string;
  };
}

const ImageSchema = new Schema<ImageDocumentInterface>({
  imageId: {
    type: Schema.Types.ObjectId,
    default: function() {
      return this._id;
    },
    unique: true,
    immutable: true,
  },
  imageTitle: {
    type: String,
    required: false,
  },
  image: {
    data: Buffer,
    contentType: {
      type: String,
      required: true,
    },
  },
});

export const Image = model<ImageDocumentInterface>('Image', ImageSchema);
