import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cron from "node-cron";
import session from "express-session";
import cookieParser from 'cookie-parser';
import "./utils/dbConnect.js";
import authentication from "./routes/authentication.js";
import verifyuser from "./routes/verifyuser.js";
import otpVerification from "./models/otpVerification.js";
import UpdateUserData from "./routes/UpdateUserData.js";

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your React app
  credentials: true,
};

dotenv.config();
const app = express();

// app.use(cors({
//   origin: 'https://blood-social.vercel.app', // Replace with your actual origin
//   credentials: true,
// }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  name: 'session',
  cookie: {
    maxAge: 900000, // Set the expiration time to 10 seconds (in milliseconds)
  },
}));

const port = process.env.PORT;

app.use("/user", authentication);
app.use("/userdata", UpdateUserData);
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
