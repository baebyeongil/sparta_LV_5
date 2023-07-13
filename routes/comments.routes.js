const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth-middleware.js');

const CommnetsController = require('../controllers/comments.controllers');
const commentsController = new CommnetsController();

router.get('/posts/:postId/comments', commentsController.viewcommnets);
router.post('/posts/:postId/comments', authMiddleware, commentsController.createcommnet);
router.put('/posts/:postId/comments/:commentId', authMiddleware, commentsController.editcommnet);
router.delete(
  '/posts/:postId/comments/:commentId',
  authMiddleware,
  commentsController.deletecommnet,
);

module.exports = router;
