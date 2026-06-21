const express = require('express')
const identifyUser = require('../middlewares/auth.middleware')
const userController   = require('../controllers/user.controller')

const userRouter = express.Router();

/* Follow api */
userRouter.post('/follow/:userId', identifyUser,userController.followUserController);


/* Unfollow api */
userRouter.post('/unfollow/:userId', identifyUser, userController.unfollowUserController);

/* Get Follow Requests */
userRouter.get('/follow-requests', identifyUser, userController.getFollowRequestsController);

/* Accept or Reject Follow Request */
userRouter.post('/follow-requests/:followerId/:action', identifyUser, userController.handleFollowRequestController);


module.exports = userRouter