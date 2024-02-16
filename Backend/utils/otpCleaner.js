import cron from "node-cron";
import otpVerification from "../models/otpVerification";

cron.schedule(
  "*/5 * * * *",
  async () => {
    try {
      const currentTime = new Date(Date.now());
      await otpVerification.deleteMany({ expirationTime: { $lt: currentTime } });
      console.log("Cron job: Unverified users deleted successfully");
    } catch (error) {
      console.error("Cron job error:", error);
    }
  },
  {
    scheduled: true,
    timezone: "IST", // Change the timezone as needed
  }
);

process.stdin.resume(); 