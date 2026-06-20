const express = require('express');
const cookieParsar = require('cookie-parser')


const app = express();

/* middlewared */
app.use(express.json());
app.use(cookieParsar());


/* require routes */
const authRouter = require('./routes/auth.routes')
const postRouter = require('./routes/post.routes')
const userRouter = require('./routes/user.routes')


/* using routes */
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);  
app.use('/api/users', userRouter);



module.exports = app;

