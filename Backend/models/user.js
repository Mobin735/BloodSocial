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
        default: '' 
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