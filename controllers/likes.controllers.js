const { json } = require('sequelize');
const LikeService = require('../services/likes.services');
const PostService = require('../services/posts.services');

class LikesController {
  likeService = new LikeService();
  postService = new PostService();

  viewlikes = async (req, res, next) => {
    const { userId } = res.locals.user;

    try {
      const Likes = await this.likeService.viewlikes(userId);
      if (!Likes.length) {
        return res.status(200).json({
          errorMessage: '좋아요한 게시글이 없습니다.',
        });
      }
      return res.status(200).json({ Likes });
    } catch {
      return (
        res.status(404),
        json({
          errorMessage: '알수없는 이유로 해당 기능을 사용할 수 없습니다.',
        })
      );
    }
  };

  liker = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    try {
      const Post = await this.postService.findOnePost(postId);
      if (!Post) {
        return res.status(200).json({
          success: false,
          errorMessage: '해당 게시글을 찾을 수 없습니다.',
        });
      }
      const like = await this.likeService.findlike(postId, userId);
      if (!like) {
        await this.likeService.likeup(postId, userId);
        return res.status(200).json({
          success: false,
          errorMessage: '좋아요를 눌렀습니다.',
        });
      } else if (like) {
        console.log('test');
        await this.likeService.likedown(postId, userId);
        return res.status(200).json({
          success: false,
          errorMessage: '좋아요를 취소했습니다.',
        });
      }
    } catch {}
  };
}
module.exports = LikesController;
