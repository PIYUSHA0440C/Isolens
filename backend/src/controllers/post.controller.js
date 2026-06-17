const postModel = require('../models/Post.model')
const Imagekit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')



const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})



// Controllers

async function createPostController(req, res){
    console.log(req.body, req.file)

    const token = req.cookies["jwt_token"];

    if(!token) return res.status(401).json({
        messsage: "Token not provided, Unauthorised Access"
    })

    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
        
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorised Access"
        })
    }

    
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "image"),
        fileName: "image",
        folder:"Social-Posts"
    })
    
    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })

    
}


async function getPostController(req, res) {

    const token = req.cookies["jwt_token"];

    if(!token) {
        return res.status(401).json({
            message: "Token not provided, Unauthorised Access"
        })
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorised Access"
        })
    }

    const userId = decoded.id;

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
}


async function getPostDetails(req, res) {
    
    const token = req.cookies["jwt_token"]

    if(!token) {
        return res.status(401).json({
            message: "Token not provided, Unauthorised Access"
        })
    }

    let decoded;
    try{

        decoded = jwt.verify(token, process.env.JWT_SECRET)

    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token, Unauthorised Access"
        })
    }

    const userId = decoded.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const isValidUser = post.user.toString() === userId;

    if(!isValidUser){
        return res.status(403).json({
            message: "Forbidden Content."
        })
    }

    res.status(200).json({
        message: "Post fetched successfully.",
        post
    })
}



module.exports = {
    createPostController,
    getPostController,
    getPostDetails
}