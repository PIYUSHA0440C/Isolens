const express = require('express');
const cookieParsar = require('cookie-parser')
const authRouter = require('./routes/auth.routes')
const postRouter = require('./routes/post.routes')

const app = express();


// middlewares
app.use(express.json());
app.use(cookieParsar());



// routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter)



module.exports = app;

