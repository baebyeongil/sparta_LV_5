const { json } = require('sequelize');
const CommentService = require('../services/commnents.services');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class CommentsController {
  commentService = new CommentService(); // Post 서비스의 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  viewcommnets = async (req, res, next) => {
    const { postId } = req.params;

    try {
      const Comments = await this.commentService.findComments(postId);
      if (!Comments.length) {
        return res.status(200).json({
          errorMessage: '작성된 댓글이 없습니다.',
        });
      }
      return res.status(200).json({ Comments });
    } catch (error) {
      return (
        res.status(404),
        json({
          errorMessage: '알수없는 이유로 해당 기능을 사용할 수 없습니다.',
        })
      );
    }
  };

  createcommnet = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const { comment } = req.body;

    try {
      if (!comment) {
        return res.status(404).json({
          errorMessage: '댓글이 입력되지 않았습니다.',
        });
      }
      await this.commentService.createComment(postId, userId, comment);
      return res.status(200).json({ message: '댓글이 작성되었습니다.' });
    } catch (error) {
      return (
        res.status(404),
        json({
          errorMessage: '알수없는 이유로 해당 기능을 사용할 수 없습니다.',
        })
      );
    }
  };

  editcommnet = async (req, res, next) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    const { comment } = req.body;
    try {
      if (!comment) {
        return res.status(404).json({
          success: false,
          errorMessage: '댓글이 입력되지 않았습니다.',
        });
      }

      const Comment = await this.commentService.findOneComment(commentId);

      console.log(Comment);

      if (!Comment) {
        return res.status(404).json({
          success: false,
          errorMessage: '댓글을 찾을 수 없습니다.',
        });
      } else if (Comment.CUserId !== userId) {
        return res.status(401).json({
          success: false,
          message: '권한이 없습니다.',
        });
      }
      await this.commentService.editComment(commentId, comment);
      return res.status(200).json({
        success: true,
        message: '댓글이 수정되었습니다.',
      });
    } catch (error) {
      return (
        res.status(404),
        json({
          errorMessage: '알수없는 이유로 해당 기능을 사용할 수 없습니다.',
        })
      );
    }
  };

  deletecommnet = async (req, res, next) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    try {
      const Comment = await this.commentService.findOneComment(commentId);

      if (!Comment) {
        return res.status(404).json({
          success: false,
          errorMessage: '댓글을 찾을 수 없습니다.',
        });
      } else if (Comment.CUserId !== userId) {
        return res.status(401).json({
          success: false,
          message: '권한이 없습니다.',
        });
      }
      await this.commentService.deleteComment(commentId);
      return res.status(200).json({
        success: true,
        message: '댓글이 삭제되었습니다.',
      });
    } catch (error) {
      return (
        res.status(404),
        json({
          errorMessage: '알수없는 이유로 해당 기능을 사용할 수 없습니다.',
        })
      );
    }
  };
}

module.exports = CommentsController;
