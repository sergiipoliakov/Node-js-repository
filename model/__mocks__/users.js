const { User, users } = require('./data');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const findById = jest.fn(id => {
  const [user] = users.filter(el => String(el._id) === String(id));
  return user;
});

const findByEmail = jest.fn(email => {
  const [user] = users.filter(el => String(el.email) === String(email));
  return user;
});

const create = jest.fn(
  ({ name = 'Guest', email, password, gender = 'female' }) => {
    pass = bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(SALT_WORK_FACTOR),
      null,
    );
    const newUser = {
      name,
      email,
      password: pass,
      gender,
      _id: '5f8382425ba83a4f1829ca7d',
      validPassword: function (pass) {
        return bcrypt.compareSync(pass, this.password);
      },
    };
    users.push(newUser);
    return newUser;
  },
);

const updateToken = jest.fn((id, token) => {
  return {};
});

const updateAvatar = jest.fn((id, avatar, idCloudAvatar = null) => {
  const [user] = users.filter(el => String(el._id) === String(id));
  user.avatar = avatar;
  user.idCloudAvatar = idCloudAvatar;
  return user;
});

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateAvatar,
};
