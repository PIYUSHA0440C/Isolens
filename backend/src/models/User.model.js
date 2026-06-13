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
        required: [true, "Password is require"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/zk06e5o0lx/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3407.avif" 
    }
})


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;