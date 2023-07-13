const express = require('express');
const router = express.Router();

const postsRouter = require('./posts.routes');
const usersRouter = require('./users.routes');
const likesRouter = require('./likes.routes');
const commentsRouter = require('./comments.routes');

router.use('/', [postsRouter, usersRouter, commentsRouter, likesRouter]);
module.exports = router;
