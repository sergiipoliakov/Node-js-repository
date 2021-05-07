const { cats } = require('./data');

const getAll = async((userId, query) => {
  const { limit = 5, offset = 0 } = query;
  return { cats, total: cats.length, limit, offset };
});

const getById = async (userId, id) => {
  const [cat] = cats.filter(el => String(el._id) === String(id));
  return cat;
};

const remove = async (userId, id) => {
  const index = cats.findIndex(el => String(el._id) === String(id));
  if (index === -1) {
    return null;
  }
  const [cat] = cats.splice(index, 1);
  return cat;
};

const create = async (userId, body) => {
  const resolt = await Cats.create({ ...body, owner: userId });
  return resolt;
};

const update = async (userId, id, body) => {
  const result = await Cats.findByIdAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true },
  );

  return result;
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
