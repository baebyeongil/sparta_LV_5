const { Posts, Users } = require('../models');

class PostRepository {
  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const allPosts = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
    });

    return allPosts;
  };
  findOnePost = async (postId) => {
    const post = await Posts.findOne({
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
      where: { postId },
    });
    return post;
  };

  createPost = async (title, content, userId) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const post = await Posts.create({
      title,
      PUserId: userId,
      content,
    });

    return post;
  };

  editPost = async (postId, title, content) => {
    const post = await Posts.update(
      {
        title: title,
        content: content,
      },
      {
        where: { postId },
      },
    );
    console.log(post);
    return post;
  };

  deletePost = async (postId) => {
    const post = await Posts.destroy({ where: { postId } });
    return post;
  };
}

module.exports = PostRepository;
