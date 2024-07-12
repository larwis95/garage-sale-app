import mongoose from "mongoose";

const uri =
  process.env.NEXT_PUBLIC_MONGODB_URI ||
  "mongodb://127.0.0.1:27017/sales-tracker-db";

const dbConnect = async () => {
  try {
    if (uri) {
      await mongoose.connect(uri);
      console.log("🎉 connected to database successfully");
    }
  } catch (error) {
    console.error(error);
  }
};

export default dbConnect;
