const mongoose = require('mongoose')


const followSchema = new mongoose.Schema({
    follower: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Follower is required"]
    },
    followee: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Followee is required"]
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "accepted", "rejected"],
            message: "Status can only be pending, accepted or rejected"
        }
    }
}, {
    timestamps: true
})

followSchema.index({ follower: 1, followee: 1 }, { unique: true });

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;