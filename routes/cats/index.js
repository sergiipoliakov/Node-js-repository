const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/cats');
const {
  validationCreateCat,
  validationUpdateCat,
  validationObjectId,
  validationUpdateStatusCat,
} = require('./valid-cat-router');
const guard = require('../../helper/guard');


router
  .get('/', guard, ctrl.getAll)
  .post('/', guard, validationCreateCat, ctrl.create);

router
  .get('/:id', guard, validationObjectId, ctrl.getById)
  .put('/:id', guard, validationUpdateCat, ctrl.update)
  .patch('/:id/vaccinated', guard, validationUpdateStatusCat, ctrl.updateStatus)
  .delete('/:id', guard, ctrl.remove);

module.exports = router;
