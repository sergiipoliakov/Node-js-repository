const { data } = require('./data')


const findById = async id => {
    const [user] = cats.filter(el => String(el._id) === String(id));
    return user;
};

const findByEmail = jest.fn(email => {
  return await User.findOne({ email });
});

const create = jest.fn(userOptions => {
  const user = new User(userOptions);
  return await user.save();
});

const updateToken = jest.fn(  (id, token) => {
  return  User.updateOne({ _id: id }, { token });
});

const updateAvatar = async (id, avatar, idCloudAvatar = null) => {
  return await User.updateOne({ _id: id }, { avatar, idCloudAvatar });
};

module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  updateAvatar,
};
