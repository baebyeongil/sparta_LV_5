const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth-middleware.js');

const LikesController = require('../controllers/likes.controllers.js');
const likesController = new LikesController();

router.get('/likes', authMiddleware, likesController.viewlikes);
router.post('/posts/:postId/like', authMiddleware, likesController.liker);

module.exports = router;
