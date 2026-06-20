const express = require('express')
const postRouter = express.Router();

const identifyUser = require('../middlewares/auth.middleware')
const postController = require('../controllers/post.controller')

const multer = require('multer')
const upload = multer({storage: multer.memoryStorage()});


/**
 * @route POST /api/posts/
 * @desc Create a new post
 * @access Private
 */
postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController);


/**
 * @route GET /api/posts/
 * @desc Get all posts of the user
 * @access Private
 */
postRouter.get("/", identifyUser, postController.getPostController);


/**
 * @route GET /api/posts/details/:postId
 * @desc Get details of a post
 * @access Private
 */
postRouter.get("/details/:postId", identifyUser, postController.getPostDetails);


/**
 * @route POST /api/posts/like/:postId
 * @desc Like a post
 * @access Private
 */
postRouter.post("/like/:postId", identifyUser, postController.likePostController);


module.exports = postRouter