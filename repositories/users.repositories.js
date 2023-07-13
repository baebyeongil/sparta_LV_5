const { Users } = require('../models');

class UserRepository {
  joinUser = async (nickname, password) => {
    const user = await Users.create({
      nickname,
      password,
    });

    return user;
  };

  findnickname = async (nickname) => {
    const nicknames = await Users.findOne({ where: { nickname: nickname } });
    return nicknames;
  };
}

module.exports = UserRepository;
