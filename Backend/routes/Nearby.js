import express from "express";
import user from "../models/user.js";

const nearby = express.Router();

nearby.get("/nearbyusers", async (req, res) => {
    const { lon,lat } = req.query;
    
    const users = await user.find({
        fullname: { $ne: '' },
        bloodtype: { $ne: '' },
        userlocation: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [parseFloat(lon), parseFloat(lat)]
                },
                $maxDistance: 5000
            }
        }
    });

    const nearbyusers = users.map((user)=>({
        name: user.fullname,
        bloodtype: user.bloodtype,
        coordinates: user.userlocation,
        updatedtime: user.updatedtime
    }));

    // console.log("nearby users",nearbyusers);
    res.status(200).json({message:"usersFetched",users:nearbyusers});
})

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