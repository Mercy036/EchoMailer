import dotenv from "dotenv";
dotenv.config();
console.log("Loaded MONGODB_URI:", process.env.MONGODB_URI);


import { app } from "./app.js";
import { connectDB } from "./connection/mongodb.connect.js";

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Connected At ${PORT}`);
  });
});
