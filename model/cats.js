const Cats = require('./schemas/cat');

const getAll = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    isVaccinated = null,
    limit = 5,
    offset = 0,
  } = query;
  const optionsSearch = { owner: userId };
  if (isVaccinated !== null) {
    optionsSearch.isVaccinated = isVaccinated;
  }
  const resolts = await Cats.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortBy ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split(' ').join(' ') : '',
    populate: {
      path: 'owner',
      select: 'name email gender',
    },
  });
  return resolts;
};

const getById = async (userId, id) => {
  const resolt = await Cats.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'name email gender',
  });
  return resolt;
};

const remove = async (userId, id) => {
  const resolt = await Cats.findByIdAndRemove({ _id: id, owner: userId });
  return resolt;
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
