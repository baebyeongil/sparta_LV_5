const PostRepository = require('../repositories/posts.repositories');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allPost = await this.postRepository.findAllPost();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return allPost.map((post) => {
      return {
        postId: post.postId,
        title: post.title,
        content: post.content,
        nickname: post.User.nickname,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  findOnePost = async (postId) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const post = await this.postRepository.findOnePost(postId);

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return post;
  };

  createPost = async (title, content, userId) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const post = await this.postRepository.createPost(title, content, userId);
    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return post;
  };

  editPost = async (postId, title, content) => {
    const post = await this.postRepository.editPost(postId, title, content);

    return post;
  };

  deletePost = async (postId) => {
    const post = await this.postRepository.deletePost(postId);

    return post;
  };
}

module.exports = PostService;
