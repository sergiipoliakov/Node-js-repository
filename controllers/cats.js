const Cats = require('../model/cats');

const getAll = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { cats, total, limit, offset } = await Cats.getAll(userId, req.query);
    return res.json({
      status: 'success',
      code: 200,
      data: {
        cats,
        total,
        limit,
        offset,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const cat = await Cats.getById(userId, req.params.id);

    if (cat) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          cat, // срабатывает toJSON()
        },
      });
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const cat = await Cats.create(userId, req.body);
    return res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        cat,
      },
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const cat = await Cats.update(userId, req.params.id, req.body);
    if (cat) {
      return res.json({
        status: 'success',
        code: 200,
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
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const cat = await Cats.remove(userId, req.params.id);
    if (cat) {
      return res.json({
        status: 'success',
        code: 200,
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
  } catch (e) {
    next(e);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const cat = await Cats.update(userId, req.params.id, req.body);
    if (cat) {
      return res.json({
        status: 'success',
        code: 200,
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
  } catch (e) {
    next(e);
  }
};

const onlyMan = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'Only man',
    },
  });
};

const onlyFemale = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'Only woman',
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  updateStatus,
  onlyMan,
  onlyFemale,
};
