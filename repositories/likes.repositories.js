const { Posts, Users, Likes } = require('../models');

class LikeRepository {
  viewlikes = async (userId) => {
    const Like = await Likes.findAll({
      where: { LUser_Id: userId },
      include: [
        {
          model: Posts,
          order: [['like', 'DESC']],
          include: [
            {
              model: Users,
              attributes: ['nickname'],
            },
          ],
        },
      ],
      attributes: [],
    });
    return Like;
  };

  findlike = async (postId, userId) => {
    const like = await Likes.findOne({
      where: [{ LPost_Id: postId }, { LUser_Id: userId }],
    });
    return like;
  };

  likeup = async (postId, userId) => {
    const Liker = await Posts.update(
      {
        like: +1,
      },
      {
        where: { postId },
      },
    );
    const Likers = await Likes.create({
      LPost_Id: postId,
      LUser_Id: userId,
    });
    return Liker, Likers;
  };

  likedown = async (postId, userId) => {
    const Liker = await Posts.update(
      {
        like: -1,
      },
      {
        where: { postId },
      },
    );
    const Likers = await Likes.destroy({
      where: [{ LPost_Id: postId }, { LUser_Id: userId }],
    });
    return Liker, Likers;
  };
}

module.exports = LikeRepository;
