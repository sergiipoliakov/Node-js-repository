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
  const results = await Cats.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}), // name: 1
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split('|').join(' ') : '',
    populate: {
      path: 'owner',
      select: 'name email gender -_id',
    },
  });
  const { docs: cats, totalDocs: total } = results;
  return { cats, total, limit, offset };
};

const getById = async (userId, id) => {
  const result = await Cats.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'name email gender -_id',
  });
  return result;
};

const remove = async (userId, id) => {
  const result = await Cats.findByIdAndRemove({ _id: id, owner: userId });
  return result;
};

const create = async (userId, body) => {
  const result = await Cats.create({ ...body, owner: userId });
  return result;
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
