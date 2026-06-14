const postModel = require('../models/Post.model')
const Imagekit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')



const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

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


module.exports = {
    createPostController
}