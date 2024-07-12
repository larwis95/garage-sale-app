import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  type?: string;
  sales?: [{ type: mongoose.Schema.Types.ObjectId; ref: "Sale" }];
  favorites?: [{ type: mongoose.Schema.Types.ObjectId; ref: "Sale" }];
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "basic",
  },
  sales: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale",
    },
  ],
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sale",
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = process.env.SALT_ROUNDS
      ? parseInt(process.env.SALT_ROUNDS)
      : 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);
