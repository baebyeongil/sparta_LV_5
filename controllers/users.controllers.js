const { json } = require('sequelize');
const UserService = require('../services/users.services');

class UsersController {
  UserService = new UserService();

  joinUsers = async (req, res, next) => {
    try {
      const nicknamecheck = /^(?=.*[\da-zA-Z])[0-9a-zA-Z]{3,}$/;

      const { nickname, password, confirmPassword } = req.body;

      const Usernickname = await this.UserService.findnickname(nickname);

      if (!nicknamecheck.test(nickname)) {
        return res.status(400).json({
          success: false,
          message: '닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성해 주세요.',
        });
      } else if (Usernickname) {
        return res.status(400).json({
          success: false,
          errorMessage: '이미 존재하는 닉네임입니다.',
        });
      } else if (password.length < 4 || password.includes(nickname)) {
        return res.status(400).json({
          success: false,
          errorMessage: '비밀번호는 최소 4자 이상, 닉네임과 일치할 수 없습니다.',
        });
      } else if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          errorMessage: '패스워드가 패스워드 확인란과 다릅니다.',
        });
      }
      await this.UserService.joinUser(nickname, password);
      return res.status(201).json({
        success: true,
        message: '계정이 생성되었습니다.',
      });
    } catch (error) {
      return (
        res.status(404),
        json({
          errorMessage: '알 수 없는 이유로 기능을 사용 할 수 없습니다.',
        })
      );
    }
  };

  authUsers = async (req, res, next) => {
    try {
      const { nickname, password } = req.body;

      const user = await this.UserService.findnickname(nickname);

      const { cookie } = await this.UserService.authUser(nickname);

      if (!user || password !== user.password) {
        res.status(400).json({
          errorMessage: '닉네임 또는 패스워드를 확인해주세요.',
        });
        return;
      }
      res.cookie('authorization', `Bearer ${cookie.token}`);
      res.status(200).json({
        success: true,
        message: `${cookie.token}`,
      });
    } catch {
      return (
        res.status(404),
        json({
          errorMessage: '알 수 없는 이유로 기능을 사용 할 수 없습니다.',
        })
      );
    }
  };
}

module.exports = UsersController;
