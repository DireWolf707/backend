import validator from "validator";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        lowercase: true
    },
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength: 8
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

const User = mongoose.model('user', userSchema);

export default User;

