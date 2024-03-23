import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userlocation: {
        type: [Number],
        required: true
    },
    updatedtime: {
        type: Number,
        require: true
    },
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

// Define a 2dsphere index on the 'userlocation' field for geospatial queries
// userSchema.index({ userlocation: '2dsphere' });

const User = mongoose.model('User', userSchema);

export default User;
