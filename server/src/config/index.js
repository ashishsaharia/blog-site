import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  db: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};

export const connectDB = async () => {
  await mongoose.connect(config.db);
};

