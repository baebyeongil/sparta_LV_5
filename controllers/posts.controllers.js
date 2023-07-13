const { json } = require('sequelize');
const PostService = require('../services/posts.services');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postService = new PostService(); // Post 서비스의 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  viewallposts = async (req, res, next) => {
    try {
      const Posts = await this.postService.findAllPost();
      if (!Posts.length) {
        return res.status(200).json({
          errorMessage: '작성된 게시글이 없습니다.',
        });
      }
      return res.status(200).json({ Posts });
    } catch {
      return (
        res.status(404),
        json({
          errorMessage: '알수없는 이유로 해당 기능을 사용할 수 없습니다.',
        })
      );
    }
  };

  viewonepost = async (req, res, next) => {
    const { postId } = req.params;
    try {
      const Post = await this.postService.findOnePost(postId);
      if (!Post) {
        return res.status(200).json({
          errorMessage: '작성된 게시글이 없습니다.',
        });
      }
      return res.status(200).json({ Post });
    } catch (error) {
      return (
        res.status(404),
        json({
          errorMessage: '알수없는 이유로 해당 기능을 사용할 수 없습니다.',
        })
      );
    }
  };

  createpost = async (req, res, next) => {
    const { title, content } = req.body;
    const { userId } = res.locals.user;

    try {
      if (!title) {
        return res.status(404).json({
          errorMessage: '제목이 입력되지 않았습니다.',
        });
      } else if (!content) {
        return res.status(404).json({
          errorMessage: '내용이 입력되지 않았습니다.',
        });
      }
      await this.postService.createPost(title, content, userId);
      return res.status(200).json({ message: '게시물이 작성되었습니다.' });
    } catch (error) {
      return (
        res.status(404),
        json({
          errorMessage: '알수없는 이유로 해당 기능을 사용할 수 없습니다.',
        })
      );
    }
  };

  editpost = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    const { title, content } = req.body;
    try {
      const Post = await this.postService.findOnePost(postId);

      if (!Post) {
        return res.status(404).json({
          success: false,
          errorMessage: '해당 게시글을 찾을 수 없습니다.',
        });
      } else if (Post.PUserId !== userId) {
        return res.status(401).json({
          success: false,
          message: '권한이 없습니다.',
        });
      }
      await this.postService.editPost(postId, title, content);
      return res.status(200).json({
        success: true,
        message: '해당 게시글이 수정되었습니다.',
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

  deletepost = async (req, res, next) => {
    const { postId } = req.params;
    const { userId } = res.locals.user;
    try {
      const Post = await this.postService.findOnePost(postId);

      if (!Post) {
        return res.status(404).json({
          success: false,
          errorMessage: '해당 게시글을 찾을 수 없습니다.',
        });
      } else if (Post.PUserId !== userId) {
        return res.status(401).json({
          success: false,
          message: '권한이 없습니다.',
        });
      }
      await this.postService.deletePost(postId);
      return res.status(200).json({
        success: true,
        message: '해당 게시글이 삭제되었습니다.',
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

module.exports = PostsController;
