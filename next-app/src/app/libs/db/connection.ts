import mongoose from "mongoose";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI || "mongodb://127.0.0.1:27017/sales-tracker-db";

mongoose.connect(uri);

export default mongoose.connection;
