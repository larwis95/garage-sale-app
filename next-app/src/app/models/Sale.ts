import mongoose from "mongoose";
import ItemSchema from "./Item";
import IItem from "./Item";

export interface ISale extends mongoose.Document {
  title: string;
  category: string;
  startDate: Date;
  endDate: Date;
  location: string;
  description: string;
  discount: number;
  recurring: boolean;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  items: (typeof IItem)[];
}

const SaleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  recurring: { type: Boolean, required: false },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  items: [ItemSchema],
});

export default mongoose.models.Sale ||
  mongoose.model<ISale>("Sale", SaleSchema);
