const express = require('express')
cons
const userController   = require('../controllers/user.controller')

const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:userId
 * @description Follow a user
 * @access Private
 */
userRouter.post('/follow/:userId', userController.followUserController)


module.exports = userRouter