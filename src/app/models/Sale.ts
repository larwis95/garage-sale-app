import mongoose from "mongoose";


export interface ISale extends mongoose.Document {
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  geoLocation: { type: string; index?: string; coordinates: [number, number] };
  description: string;
  items: [{ type: mongoose.Schema.Types.ObjectId; ref: "Item" }];
}

const SaleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startDate: { type: String },
  endDate: { type: String },
  location: { type: String },
  geoLocation: { type: Object, index: "2dsphere", coordinates: [Number] },
  description: { type: String },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

SaleSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("location")) {
    const apiKey = process.env.GOOGLE_API_KEY
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.location}&key=${apiKey}`);
    const data = await response.json();
    if (!data || data.status === "ZERO_RESULTS") {
      throw new Error("No results found for location");
    }
    console.log(data);
    const { lat, lng } = data.results[0].geometry.location;
    console.log(lat, lng);
    this.geoLocation = { type: "Point", coordinates: [lng, lat] };
  }
  next();
});

SaleSchema.index({ geoLocation: "2dsphere" });

export default mongoose.models.Sale || mongoose.model<ISale>("Sale", SaleSchema);
