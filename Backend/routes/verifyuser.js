import express from "express";
import { VerifyJWT } from "../utils/JwtToken.js";

const verifyuser = express.Router();

verifyuser.get('/verify',VerifyJWT,(req, res) => {
    const userData = {
        email: req.data.user.email
    }   
    res.status(200).json({user:userData});
    return;
})

export default verifyuser;