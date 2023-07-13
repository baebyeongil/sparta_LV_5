const CommentRepository = require('../repositories/commnents.repositories');

class CommnentService {
  commentRepository = new CommentRepository();

  findComments = async (postId) => {
    const Comments = await this.commentRepository.findComments(postId);

    Comments.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return Comments.map((comments) => {
      return {
        commentId: comments.commentId,
        CUserId: comments.CUserId,
        CPostId: comments.CPostId,
        comment: comments.comment,
        nickname: post.User.nickname,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
      };
    });
  };

  createComment = async (postId, userId, comment) => {
    const Comment = await this.commentRepository.createComment(postId, userId, comment);

    return Comment;
  };

  findOneComment = async (commentId) => {
    console.log(commentId);
    const Comment = await this.commentRepository.findOneComment(commentId);

    return Comment;
  };

  editComment = async (commentId, comment) => {
    const Comment = await this.commentRepository.editComment(commentId, comment);

    return Comment;
  };

  deleteComment = async (commentId) => {
    const Comment = await this.commentRepository.deleteComment(commentId);

    return Comment;
  };
}

module.exports = CommnentService;
