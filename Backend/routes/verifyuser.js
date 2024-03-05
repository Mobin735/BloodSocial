import express from "express";
import { VerifyJWT } from "../utils/JwtToken.js";
import cors from "cors";

const allowedOrigins = ['http://localhost:3000', 'https://blood-social.vercel.app'];

const verifyuser = express.Router();
verifyuser.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

verifyuser.get('/verify',VerifyJWT,(req, res) => {
    const userData = {
        email: req.data.user.email,
        fullname: req.data.user.fullname,
        mobile: req.data.user.mobile ?? '',
        bloodtype: req.data.user.bloodtype,
        state: req.data.user.state,
        city: req.data.user.city
    }   
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({user:userData});
    return;
})

export default verifyuser;