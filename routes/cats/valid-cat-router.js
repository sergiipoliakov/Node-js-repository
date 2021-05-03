const Joi = require('joi');
const mongoose = require('mongoose');

const schemaCreateCat = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  age: Joi.number().integer().min(1).max(99).required(),

  isVaccinated: Joi.boolean().optional(),
});

const schemaQueryCat = Joi.object({
  sortBy: Joi.string().valid('name', 'age', 'id').optional(),
  sortByDesc: Joi.string().valid('name', 'age', 'id').optional(),
  filter: Joi.string().optional(),
  limit: Joi.number().integer().min(1).max(50).optional(),
  offset: Joi.number().integer().min(0).optional(),
  isVaccinated: Joi.boolean().optional(),
}).without('sortBy', 'sortByDesc');

const schemaUpdateCat = Joi.object({
  name: Joi.string().min(3).max(30).optional(),

  age: Joi.number().integer().min(1).max(99).optional(),

  isVaccinated: Joi.boolean().optional(),
}).or('name', 'age', 'isVaccinated');

const schemaUpdateStatusCat = Joi.object({
  isVaccinated: Joi.boolean().required(),
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    return next();
  } catch (err) {
    console.log(err);
    next({ status: 400, message: err.message.replace(/"/g, "'") });
  }
};

module.exports = {
  validationQueryCat: async (req, res, next) => {
    return await validate(schemaQueryCat, req.query, next);
  },
  validationCreateCat: async (req, res, next) => {
    return await validate(schemaCreateCat, req.body, next);
  },
  validationUpdateCat: async (req, res, next) => {
    return await validate(schemaUpdateCat, req.body, next);
  },
  validationUpdateStatusCat: async (req, res, next) => {
    return await validate(schemaUpdateStatusCat, req.body, next);
  },
  validationObjectId: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next({ status: 400, message: 'Invalid Object Id ' });
    }
    next();
  },
};
