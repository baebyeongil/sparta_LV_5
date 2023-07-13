const { Comments, Users } = require('../models');

class CommentRepository {
  findComments = async (postId) => {
    const Commen = await Comments.findAll({
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
      where: { CPostId: postId },
    });

    return Commen;
  };

  createComment = async (postId, userId, comment) => {
    const Comment = await Comments.create({
      CUserId: userId,
      CPostId: postId,
      comment,
    });

    return Comment;
  };

  findOneComment = async (commentId) => {
    const Comment = await Comments.findOne({
      where: { commentId },
    });
    return Comment;
  };

  editComment = async (commentId, comment) => {
    const Comment = await Comments.update(
      {
        comment: comment,
      },
      {
        where: { commentId },
      },
    );
    return Comment;
  };

  deleteComment = async (commentId) => {
    const Comment = await Comments.destroy({ where: { commentId } });
    return Comment;
  };
}

module.exports = CommentRepository;
