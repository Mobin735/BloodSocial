import express from "express";
import { CreateJWT, VerifyJWT } from "../utils/JwtToken.js";
import user from "../models/user.js";

const UpdateUserData = express.Router();

UpdateUserData.post("/update", VerifyJWT, async (req, res) => {
    const userEmail = req.data.user.email
    const { fullname, mobile, bloodtype, state, city } = req.body;

    try {
        await user.updateOne({ email: userEmail }, {
            fullname: fullname,
            mobile: mobile,
            bloodtype: bloodtype,
            state: state,
            city: city
        })

        const userData = {
            email: userEmail,
            fullname,
            mobile,
            bloodtype,
            state,
            city
        }
        const token = CreateJWT(userData);
        res.status(200).json({ message: "updated", token });
    } catch (error) {
        res.json({ message: "error while updating data to DB!" });
    }
})

export default UpdateUserData;