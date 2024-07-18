import mongoose from "mongoose";

export interface ISale extends mongoose.Document {
  title: string;
  category: string;
  startDate: Date;
  endDate: Date;
  location: string;
  geoLocation: { type: string; index?: string; coordinates: [number, number] };
  description: string;
  discount: number;
  recurring: boolean;
  items: [{ type: mongoose.Schema.Types.ObjectId; ref: "Item" }];
}

const SaleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  location: { type: String },
  geoLocation: { type: Object, index: "2dsphere", coordinates: [Number] },
  description: { type: String },
  recurring: { type: Boolean },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

SaleSchema.index({ location: "2dsphere" });

SaleSchema.pre("save", async function (next) {
  if (this.location) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.location}&key=${process.env.GOOGLE_API_KEY}`);
    const data = await response.json();
    if (!data || data.status === "ZERO_RESULTS") {
      throw new Error("No results found for location");
    }
    const { lat, lng } = data.results[0].geometry.location;
    console.log(lat, lng);
    this.geoLocation = { type: "Point", coordinates: [lng, lat] };
  }
  next();
});

export default mongoose.models.Sale || mongoose.model<ISale>("Sale", SaleSchema);
