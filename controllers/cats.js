const Cats = require('../model/cats');

const getAll = async (req, res, next) => {
  try {
    const cats = await Cats.getAll();
    return res.json({
      status: 'success',
      code: 200,
      data: {
        cats,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const cat = await Cats.getById(req.params.id);
    if (cat) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          cat,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const cat = await Cats.create(req.body);
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        cat,
      },
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const cat = await Cats.remove(req.params.id);
    if (cat) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          cat,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const cat = await Cats.update(req.params.id, req.body);
    if (cat) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          cat,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const cat = await Cats.update(req.params.id, req.body);
    if (cat) {
      return res.status(201).json({
        status: 'success',
        code: 201,
        data: {
          cat,
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  updateStatus,
};
