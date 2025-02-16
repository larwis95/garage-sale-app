import mongoose from "mongoose";

export interface IItem extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  discount: number;
}

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  sale: { type: mongoose.Schema.Types.ObjectId, ref: "Sale" },
});

export default mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);
