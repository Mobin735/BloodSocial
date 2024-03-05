import express from "express";
import { VerifyJWT } from "../utils/JwtToken.js";

const verifyuser = express.Router();


verifyuser.get('/verify',VerifyJWT,(req, res) => {
    const userData = {
        email: req.data.user.email,
        fullname: req.data.user.fullname,
        mobile: req.data.user.mobile ?? '',
        bloodtype: req.data.user.bloodtype,
        state: req.data.user.state,
        city: req.data.user.city
    }   
    res.status(200).json({user:userData});
    return;
})

export default verifyuser;