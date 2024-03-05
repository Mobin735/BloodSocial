import express from "express";
import bcrypt from "bcrypt";
import user from "../models/user.js";
import nodemailer from "nodemailer";
import otpVerification from "../models/otpVerification.js";
import { CreateJWT } from "../utils/JwtToken.js";

const authentication = express.Router();

authentication.post("/login", async (req, res) => {
    let { userEmail, userPassword } = req.body;

    let result = await user.find({ email: userEmail });

    if (result.length === 0) {
        res.send(false);
        return;
    } else if (userPassword?.trim() === "" || userPassword === undefined) {
        res.send("incorrect");
        return;
    } else {
        const passwordMatch = await bcrypt.compare(
            userPassword,
            result[0].password
        );
        if (passwordMatch) {
            const token = CreateJWT(result[0]);
            
            res.status(200).json({ message: 'success', token });
        }
        else {
            res.send("incorrect");
        }
        return;
    }
});

// authentication.post("/test", async (req, res) => {
//     await otpVerification.deleteMany({ email: "gamesproject09@gmail.com" })
//     // await user.deleteMany({ email: "gamesproject09@gmail.com" })
//     // if (req.session.email) {
//     //     console.log("session found");
//     //     console.log(req.session);
//     //     req.session.destroy();
//     //     console.log(req.session);
//     //     res.cookie("token","helooooooo");
//     // }
//     // else {
//     //     console.log("session not found and created");
//     //     req.session.email = "mobin";
//     // }
//     res.send("hello");
// })

authentication.post("/signup", async (req, res) => {
    let { otp, userEmail, userPass, forgetPass } = req.body;
    //userFound.length !== 0
    let isSessionExist = req.session.email ? true : false;

    if (isSessionExist && userEmail === req.session.email) {
        let userFound = await otpVerification.find({ email: req.session.email })

        if (userFound.length !== 0) {
            const isOTPExpired = await timeCheck(userFound[0].expirationTime, userEmail);
            const isValidOTP = userFound[0].otp == otp && !isOTPExpired;
            
            if (isValidOTP) {
                const hashPassword = await bcrypt.hash(userPass, 10);
                if (forgetPass === 'password update') {
                    await user.updateOne({ email: req.session.email }, { password: hashPassword });
                    res.send("pass updated");
                }
                else {
                    //new user singup!
                    let data = new user({ email: userEmail, password: hashPassword });
                    await data.save();
                    res.send("account created");
                }
                req.session.destroy();
                await otpVerification.deleteOne({ email: userEmail });
            }
            else {
                req.session.otpCount += 1;
                if (req.session.otpCount === 5) {
                    await otpVerification.deleteOne({ email: userEmail });
                    req.session.destroy();
                }
                res.send("wrong otp");
            }
        }
        else {
            try {
                sentOtp(userEmail, false);
            } catch (error) {
                console.log("node mailer error: "+error);
            }
            res.send('otp sent');
        }
    }
    else {
        req.session.email = userEmail;
        req.session.otpCount = 1;
        try {
            sentOtp(userEmail, false);
        } catch (error) {
            console.log("node mailer error: "+error);
        }
        res.send('otp sent');
    }
    return;
});

async function timeCheck(expirationTime, email) {
    const currentTime = new Date(Date.now());
    if (currentTime > expirationTime) {
        const newOTP = true;
        sentOtp(email, newOTP);
        return true;
    }
    return false;
}

async function sentOtp(email, newOTP) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationTime = new Date(Date.now() + 15 * 60 * 1000);

    if (newOTP) {
        await otpVerification.updateOne({ email: email }, { otp, expirationTime });
    } else {
        let data = new otpVerification({ email: email, otp, expirationTime });
        await data.save();
    }

    try {
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
            text: `Your OTP is: ${otp}, This OTP is only valid for 15 minutes`,
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending OTP:", error);
            } else {
                console.log("Email sent:", info.response);
            }
        });
    } catch (error) {
        console.log("inside node mailer failed: "+error);
    }
    
    
    // console.log(email+" "+otp);
    return;
}

export default authentication;
