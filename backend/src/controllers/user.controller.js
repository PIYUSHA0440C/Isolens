const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');


/**
 * @route POST /api/users/follow/:userId
 * @description Follow a user
 * @access Private
 */
async function followUserController(req, res){
    const followerId = req.user.id;
    const followeeId = req.params.userId;

    if(followerId === followeeId){
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const isFolloweeExists = await userModel.findById(followeeId);

    if(!isFolloweeExists){
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerId,
        followee: followeeId
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            message: "You are already following this user",
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerId,
        followee: followeeId
    })

    res.status(201).json({
        message: "You are now following the user",
        follow: followRecord
    })
}



/**
 * @route POST /api/users/unfollow/:userId
 * @description Unfollow a user
 * @access Private
 */
async function unfollowUserController(req, res){
    const followerId = req.user.id;
    const followeeId = req.params.userId;

    const isUserFollowing = await followModel.findOne({
        follower: followerId,
        followee: followeeId
    })

    if(!isUserFollowing){
        return res.status(400).json({
            message: `You are not following this user ${followeeId}`
        })
    }

    await followModel.findOneAndDelete({
        follower: followerId,
        followee: followeeId
    })

    res.status(200).json({
        message: `You have unfollowed the user ${followeeId}`
    })
}


module.exports = {
    followUserController,
    unfollowUserController
}