// src/database/db.ts
import mongoose from "mongoose";
import config from "../app/config";


export const connectDB = async () => {
  try {
    await mongoose.connect(config.dbUri);
    console.log("✅ Connected to MongoDB Successfully");
  } catch (error) {
    console.error(
      "❌ MongoDB Connection Error:",
      error instanceof Error ? error.stack : error
    );
  }
};
