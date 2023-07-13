const jwt = require('jsonwebtoken');

const UserRepository = require('../repositories/users.repositories');

class UserService {
  userRepository = new UserRepository();

  joinUser = async (nickname, password) => {
    const user = await this.userRepository.joinUser(nickname, password);
    return user;
  };

  findnickname = async (nickname) => {
    const nicknames = await this.userRepository.findnickname(nickname);

    return nicknames;
  };

  authUser = async (nickname) => {
    const user = await this.userRepository.findnickname(nickname);
    const token = jwt.sign({ userId: user.userId }, 'custom-secret-key');

    return {
      status: 200,
      cookie: {
        name: 'authorization',
        token: token,
      },
    };
  };
}

module.exports = UserService;
