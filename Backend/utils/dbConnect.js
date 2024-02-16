import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB = process.env.DATABASE_URI;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch((err) => {
    console.error("error here: ", err);
    console.log("no connection to DB!");
  });
