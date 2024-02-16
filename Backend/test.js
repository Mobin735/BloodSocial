const express = require('express');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');

const app = express();
app.use(express.json());

const users = {}; // In-memory storage for simplicity; use a database in production
const otpExpirationTime = 5 * 60 * 1000; // OTP validity time in milliseconds (5 minutes)

app.post('/send-otp', (req, res) => {
    const { email } = req.body;

    // Generate a random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store the OTP with the email and its expiration time
    users[email] = { otp, expiresAt: Date.now() + otpExpirationTime };

    // Send OTP to user's email
    sendOTP(email, otp);

    res.json({ message: 'OTP sent. Check your email for verification.' });
});

app.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    // Check if the email and OTP match
    if (users[email] && users[email].otp === otp && Date.now() < users[email].expiresAt) {
        // OTP is valid; Now, you can register the user in the database
        // In a real application, you'd likely hash the password before storing it
        const { password } = users[email];
        // Store the user in the database or perform other actions

        // Remove the user from the temporary storage after successful registration
        delete users[email];

        res.json({ message: 'OTP verified. User registered.' });
    } else {
        // Invalid OTP or expired
        delete users[email]; // Remove the user from the temporary storage
        res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }
});

// Sample nodemailer function
function sendOTP(email, otp) {
    const transporter = nodemailer.createTransport({
        // Configure your nodemailer transport (e.g., SMTP, Gmail, etc.)
    });

    const mailOptions = {
        from: 'your-email@example.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP for registration is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending OTP:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
