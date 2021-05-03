const Cats = require('../model/cats');

const getAll = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const cats = await Cats.getAll(userId, req.query);
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
    const userId = req.user?.id;
    const cat = await Cats.getById(userId, req.params.id);
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
    const userId = req.user?.id;
    const cat = await Cats.create(userId, req.body);
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
    const userId = req.user?.id;
    const cat = await Cats.remove(userId, req.params.id);
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
    const userId = req.user?.id;
    const cat = await Cats.update(userId, req.params.id, req.body);
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
    const userId = req.user?.id;
    const cat = await Cats.update(userId, req.params.id, req.body);
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

const onlyMan = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'only Man',
    },
  });
};

const onlyFemale = async (req, res, next) => {
  return res.json({
    status: 'success',
    code: 200,
    data: {
      message: 'Only Woman',
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
