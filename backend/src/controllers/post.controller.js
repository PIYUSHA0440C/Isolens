const postModel = require('../models/post.model')
const Imagekit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const likeModel = require('../models/like.model')



const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


/**
 * @route POST /api/posts/
 * @desc Create a new post
 * @access Private
 */
async function createPostController(req, res){
    console.log(req.body, req.file)

    
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "image"),
        fileName: "image",
        folder:"social-Posts"
    })
    
    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "Post created successfully",
        post
    })

    
}


/**
 * @route GET /api/posts/
 * @desc Get all posts of the user
 * @access Private
 */
async function getPostController(req, res) {

    
    const userId = req.user.id;

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
}


/**
 * @route GET /api/posts/details/:postId
 * @desc Get details of a post
 * @access Private
 */
async function getPostDetails(req, res) {
    
    

    const userId = req.user.id;
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


/**
 * @route POST /api/posts/like/:postId
 * @desc Like a post
 * @access Private
 */
async function likePostController(req, res) {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isAlreadyLiked = await likeModel.findOne({
        post: postId,
        userId: userId
    })

    if(isAlreadyLiked){
        return res.status(400).json({
            message: "Post already liked"
        })
    }

    const like = await likeModel.create({
        post: postId,
        userId: userId 
    })

    res.status(200).json({
        message: "Post liked successfully",
        like
    })
}


/**
 * @route GET /api/posts/feed
 * @desc Get the feed of posts created in DB
 * @access Private
 */
async function getFeedController(req, res){
    const posts = await postModel.find().populate('user');

    res.status(200).json({
        message: "Feed fetched successfully",
        posts
    })
}



module.exports = {
    createPostController,
    getPostController,
    getPostDetails,
    likePostController,
    getFeedController
}