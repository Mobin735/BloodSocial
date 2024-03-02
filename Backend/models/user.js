import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        default: ''
    },
    mobile: {
        type: Number,
        default: 0 // You can set the default value to 0 or any other default number
    },
    bloodtype: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    }
});

const user = mongoose.model('users',userSchema);

export default user;