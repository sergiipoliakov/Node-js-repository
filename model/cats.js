const db = require('./db');
const { ObjectId } = require('mongodb');

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const getAll = async () => {
  const collection = await getCollection(db, 'cats');
  const resolts = await collection.find().toArray();
  return resolts;
};

const getById = async id => {
  const collection = await getCollection(db, 'cats');
  const objectId = new ObjectId(id);
  console.log(objectId.getTimestamp());
  const [resolt] = await collection.find({ _id: objectId }).toArray();

  return resolt;
};

const remove = async id => {
  const collection = await getCollection(db, 'cats');
  const objectId = new ObjectId(id);
  const { value: result } = await collection.findAndRemove({ _id: objectId });
  return result;
};

const create = async body => {
  const record = {
    ...body,
    ...(body.isVaccinated ? {} : { isVaccinated: false }),
  };
  const collection = await getCollection(db, 'cats');

  const {
    ops: [resolt],
  } = await collection.insertOne(record);
  return resolt;
};

const update = async (id, body) => {
  const collection = await getCollection(db, 'cats');
  const objectId = new ObjectId(id);
  const { value: result } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    { returnOriginal: false },
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
