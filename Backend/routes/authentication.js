import express from "express";
import bcrypt from "bcrypt";
import user from "../models/user.js";
import nodemailer from "nodemailer";
import otpVerification from "../models/otpVerification.js";

const authentication = express.Router();

authentication.post("/login", async (req, res) => {
    let { userEmail, userPassword } = req.body;
    let result = await user.find({ email: userEmail });
    if (result.length === 0) {
        res.send(false);
        return;
    } else if (userPassword?.trim() === "" || userPassword === undefined) {
        res.send("user found");
        return;
    } else {
        const passwordMatch = await bcrypt.compare(
            userPassword,
            result[0].password
        );
        passwordMatch ? res.send("success") : res.send("incorrect");
        return;
    }
});

authentication.post("/signup", async (req, res) => {
    let { otp, userEmail, userPass, forgetPass } = req.body;

    let userFound = await otpVerification.find({ email: userEmail });

    if (userFound.length !== 0) {
        if (forgetPass === "otp") {
            sentOtp(userEmail, true);
            res.send(true);
        }
        else {
            const isOTPExpired = await timeCheck(userFound[0].expirationTime, userEmail);
            const verifyOTP = userFound[0].otp == otp && isOTPExpired;
            if (verifyOTP) {
                const hashPassword = await bcrypt.hash(userPass, 10);
                if (forgetPass === 'otp verify') {
                    await user.updateOne({ email: userEmail }, { password: hashPassword });
                    res.send("pass updated");
                }
                else {
                    //new user singup!
                    let data = new user({ email: userEmail, password: hashPassword });
                    await data.save();
                    res.send("account created");
                }
                await otpVerification.deleteOne({ email: userEmail });
            } 
            else {
                res.send("wrong otp");
            }
        }
    }
    else {
        const newOTP = false;
        sentOtp(userEmail, newOTP);
        res.send("otp sent");
    }
    return;
});

async function timeCheck(expirationTime, email) {
    const currentTime = new Date(Date.now());
    if (currentTime > expirationTime) {
        const newOTP = true;
        sentOtp(email, newOTP);
        return false;
    }
    return true;
}

async function sentOtp(email, newOTP) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationTime = new Date(Date.now() + 5 * 60 * 1000);

    if (newOTP) {
        await otpVerification.updateOne({ email: email }, { otp, expirationTime });
    } else {
        let data = new otpVerification({ email: email, otp, expirationTime });
        await data.save();
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS,
        },
    });

    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log(success + "Ready to sent messages!");
        }
    });

    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "OTP Verification",
        text: `Your OTP is: ${otp}, This OTP is only valid for 5 minutes`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending OTP:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
    // console.log(email+" "+otp);
    return;
}

export default authentication;
