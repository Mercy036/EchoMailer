import { connect } from "mongoose";
import dotenv from "dotenv"
dotenv.config();
export const connectDB = async () => {
  try {
    const connection = await connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB not connected", error);
    process.exit(1);
  }
};
