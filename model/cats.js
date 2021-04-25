const Cats = require('./schemas/cat');

const getAll = async () => {
  const resolts = await Cats.find();
  return resolts;
};

const getById = async id => {
  const resolt = await Cats.findOne({ _id: id });
  return resolt;
};

const remove = async id => {
  const resolt = await Cats.findByIdAndRemove({ _id: id });
  return resolt;
};

const create = async body => {
  // try {
  const resolt = await Cats.create(body);
  return resolt;
  // } catch (error) {
  //   const err = new Error(error);
  //   if (error.name === 'ValidationError') {
  //     err.status = 400;
  //   }
  //   throw err;
  // }
};

const update = async (id, body) => {
  const result = await Cats.findByIdAndUpdate(
    { _id: id },
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
