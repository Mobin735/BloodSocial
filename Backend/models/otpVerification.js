import mongoose from "mongoose";

const otpVerificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    expirationTime: {
        type: Date,
        required: true
    }
})

const otpVerification = mongoose.model('otpverifications',otpVerificationSchema);

export default otpVerification;