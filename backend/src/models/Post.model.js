const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [true, "Image is required for creating an post"]
    },
    user:{
        ref:"Users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true, "User id is required for creating an post"]
    }
})

const postModel = mongoose.model("Posts", postSchema)

module.exports = postModel;