const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth-middleware.js');

const PostsController = require('../controllers/posts.controllers.js');
const postsController = new PostsController();

router.get('/posts', postsController.viewallposts);
router.get('/posts/:postId', postsController.viewonepost);
router.post('/posts', authMiddleware, postsController.createpost);
router.put('/posts/:postId', authMiddleware, postsController.editpost);
router.delete('/posts/:postId', authMiddleware, postsController.deletepost);

module.exports = router;
