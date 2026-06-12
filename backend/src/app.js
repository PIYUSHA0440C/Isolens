const express = require('express');
const cookieParsar = require('cookie-parser')
const authRouter = require('./routes/auth.routes')

const app = express();

app.use(express.json());

app.use(cookieParsar());

app.use('/api/auth', authRouter);


module.exports = app;

