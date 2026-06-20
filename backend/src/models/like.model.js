const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "Post id is required for creating like"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User id is required for creating like"]
    }
}, {
    timestamps: true
})

likeSchema.index({ post: 1, userId: 1 }, { unique: true });

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;