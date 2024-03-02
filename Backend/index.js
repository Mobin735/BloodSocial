import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";
import cookieParser from 'cookie-parser';
import "./utils/dbConnect.js";
import authentication from "./routes/authentication.js";
import verifyuser from "./routes/verifyuser.js";
import otpVerification from "./models/otpVerification.js";

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your React app
  credentials: true,
};

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

const port = process.env.PORT;

app.use("/user", authentication);
app.use("/auth", verifyuser)

cron.schedule(
  "*/15 * * * *",
  async () => {
    try {
      const currentTime = new Date(Date.now());
      await otpVerification.deleteMany({
        expirationTime: { $lt: currentTime },
      });
      console.log("Cron job: Unverified users deleted successfully");
    } catch (error) {
      console.error("Cron job error:", error);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata", // Change the timezone as needed
  }
);

process.stdin.resume();

app.listen(port, () => {
  console.log("server is running");
});
