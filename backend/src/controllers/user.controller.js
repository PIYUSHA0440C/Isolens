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

    if(isAlreadyFollowing && isAlreadyFollowing.status === 'pending'){
        return res.status(400).json({
            message: "You have already sent a follow request to this user, currently pending",
            follow: isAlreadyFollowing
        })
    }
    

    if(isAlreadyFollowing && isAlreadyFollowing.status === 'accepted'){
        return res.status(200).json({
            message: "You are already following this user",
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerId,
        followee: followeeId,
        status: 'pending'
    })

    res.status(201).json({
        message: "You have successfully sent a follow request",
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

/**
 * @route GET /api/users/follow-requests
 * @description Get follow requests for the logged-in user
 * @access Private
 */
async function getFollowRequestsController(req, res){
    const userId = req.user.id;

    const followRequests = await followModel.find({
        followee: userId,
        status: 'pending'
    })

    res.status(200).json({
        message: "Follow requests retrieved successfully",
        followRequests
    })
}


/**
 * @route POST /api/users/follow-requests/:followerId/:action(accept|reject)
 * @description Accept or reject a follow request
 * @access Private
 */
async function handleFollowRequestController(req, res){
    const followeeId = req.user.id;
    const followerId = req.params.followerId;
    const action = req.params.action;

    if(followeeId === followerId){
        return res.status(400).json({
            message: "You cannot accept or reject your own follow request"
        })
    }

    const updateFollowRequest = await followModel.findOneAndUpdate({
        follower: followerId,
        followee: followeeId,
        status: 'pending'
        },
        {
            status: action === 'accept' ? 'accepted' : 'rejected'
        },
        {
            new: true
        }
    );

    if(!updateFollowRequest){
        const exists = await followModel.findOne({
            follower: followerId,
            followee: followeeId
        })

        if(!exists){
            return res.status(404).json({
                message: "Follow request not found"
            })
        }

        return res.status(400).json({
            message: `Follow request has already been ${exists.status}ed`
        })
    }

    if(action === 'reject'){
        await followModel.findOneAndDelete({
            follower: followerId,
            followee: followeeId,
            status: 'rejected'
        })
    }

    return res.status(200).json({
        message: `Follow request has been ${action}ed successfully`,
        followRequest: updateFollowRequest
    });

}


module.exports = {
    followUserController,
    unfollowUserController,
    getFollowRequestsController,
    handleFollowRequestController
}