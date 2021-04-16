const Joi = require('joi');

const schemaCreateCat = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  age: Joi.number().integer().min(1900).max(2013).required(),

  isVaccinated: Joi.boolean().optional(),
});

const schemaUpdateCat = Joi.object({
  name: Joi.string().min(3).max(30).optional(),

  age: Joi.number().integer().min(1900).max(2013).optional(),

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
  validationCreateCat: (req, res, next) => {
    return validate(schemaCreateCat, req.body, next);
  },
  validationUpdateCat: (req, res, next) => {
    return validate(schemaUpdateCat, req.body, next);
  },
  validationUpdateStatusCat: (req, res, next) => {
    return validate(schemaUpdateStatusCat, req.body, next);
  },
};
