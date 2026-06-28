const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exists"],
        required: true
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: true
    },
    password: {
        type: String,
        required: [true, "Password is require"],
        select: false
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/zk06e5o0lx/image_Z27nFBD4h?updatedAt=1781469298757" 
    }
})


const userModel = mongoose.model('users', userSchema);

module.exports = userModel;