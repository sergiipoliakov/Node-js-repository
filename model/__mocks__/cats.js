const { cats } = require('./data');

const getAll = jest.fn((userId, query) => {
  const { limit = 5, offset = 0 } = query;
  return { cats, total: cats.length, limit, offset };
});

const getById = jest.fn((userId, id) => {
  const [cat] = cats.filter(el => String(el._id) === String(id));
  return cat;
});

const remove = jest.fn((userId, id) => {
  const index = cats.findIndex(el => String(el._id) === String(id));
  if (index === -1) {
    return null;
  }
  const [cat] = cats.splice(index, 1);
  return cat;
});

const create = jest.fn((userId, body) => {
  cats.push({ ...body, _id: '5f8382425ba83a4f1829ca5d' });
  return { ...body, _id: '5f8382425ba83a4f1829ca5d' };
});

const update = jest.fn((userId, id, body) => {
  let [cat] = cats.filter(el => String(el._id) === String(id));
  if (cat) {
    cat = { ...cat, ...body };
  }
  return cat;
});

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
