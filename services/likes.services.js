const LikeRepository = require('../repositories/likes.repositories');

class LikeService {
  likeRepository = new LikeRepository();

  viewlikes = async (userId) => {
    const Likes = await this.likeRepository.viewlikes(userId);

    Likes.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return Likes.map((like) => {
      return {
        postId: like.Posts.postId,
        title: like.Posts.title,
        content: like.Posts.content,
        nickname: like.User.nickname,
        createdAt: like.Posts.createdAt,
        updatedAt: like.Posts.updatedAt,
      };
    });
  };

  findlike = async (postId, userId) => {
    const like = await this.likeRepository.findlike(postId, userId);

    return like;
  };

  likeup = async (postId, userId) => {
    const likeup = await this.likeRepository.likeup(postId, userId);

    return likeup;
  };

  likedown = async (postId, userId) => {
    const likedown = await this.likeRepository.likedown(postId, userId);

    return likedown;
  };
}

module.exports = LikeService;
