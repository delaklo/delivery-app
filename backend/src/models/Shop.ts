import mongoose, { Schema, Document } from 'mongoose';

export interface IShop extends Document {
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  rating: number;
}

const ShopSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 4.0 },
  },
  { timestamps: true }
);

export default mongoose.model<IShop>('Shop', ShopSchema);
