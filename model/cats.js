const { v4: uuidv4 } = require('uuid');
const db = require('./db');


const getAll = async () => {
  return db.get('cats').value();
};

const getById = async id => {
  return db.get('cats').find({ id }).value();
};

const remove = async id => {
  const [record] = db.get('cats').remove({ id }).write();
  return record;
};

const create = async body => {
  const id = uuidv4();
  const record = {
    id,
    ...body,
    ...(body.isVaccinated ? {} : { isVaccinated: false }),
  };
  db.get('cats').push(record).write();
  return record;
};

const update = async (id, body) => {
  const record = await db.get('cats').find({ id }).assign(body).value();
  db.write();
  return record.id ? record : null;
};

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
};
