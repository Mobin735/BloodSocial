import express from "express";
import user from "../models/user.js";

const nearby = express.Router();

nearby.get("/donars", async (req, res) => {
    const { bloodtype, state, city } = req.query;

    if (Object.keys(req.query).length !== 0) {
        try {
            const data = await user.find({fullname: { $ne: '' }, bloodtype, state, city });
            if (data.length > 0) {
                const donars = data.map((donar) => ({
                    name: donar.fullname
                }));
                res.status(200).json({ message: "Donars Founded", donars})
                return;
            }
        } catch (error) {
            res.status(400).json({ message: "DB Error"});
        }
    }
    res.status(200).json({ message: "No Donars Founded" })
})

export default nearby;