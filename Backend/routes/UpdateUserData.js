import express from "express";
import { CreateJWT, VerifyJWT } from "../utils/JwtToken.js";
import user from "../models/user.js";

const UpdateUserData = express.Router();

UpdateUserData.get("/getdata", VerifyJWT, async (req, res) => {
    const email = req.data.user.email;
    if (email) {
        const data = await user.findOne({ email });
        if (data) {
            const userData = {
                email: data.email,
                fullname: data.fullname,
                mobile: data.mobile,
                bloodtype: data.bloodtype,
                state: data.state,
                city: data.city
            }
            res.status(200).json({ message: "Data Fetched", user: userData });
        }
        else {
            res.status(200).json({ message: "error fetching data" });
        }
        // console.log(userData);
    } else {
        res.status(200).json({ message: "error fetching data" });
    }
})

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

        res.status(200).json({ message: "updated" });
    } catch (error) {
        res.json({ message: "error while updating data to DB!" });
    }
})

export default UpdateUserData;