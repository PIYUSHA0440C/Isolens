const postModel = require('../models/Post.model')
const Imagekit = require('@imagekit/nodejs')
const { toFile } = require('@imagekit/nodejs')


const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res){
    console.log(req.body, req.file)

    const file = await imagekit.files.upload({
        file: await Imagekit.toFile(Buffer.from(req.file.buffer), "image"),
        fileName: "image"
    })

    res.send(file)
}


module.exports = {
    createPostController
}