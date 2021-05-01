const express = require('express');
// const { required } = require('joi');
const router = express.Router();
const ctrl = require('../../controllers/cats');
const {
  validationCreateCat,
  validationUpdateCat,
  validationObjectId,
  validationUpdateStatusCat,
} = require('./valid-cat-router');

router.get('/', ctrl.getAll).post('/', validationCreateCat, ctrl.create);

router
  .get('/:id', validationObjectId, ctrl.getById)
  .put('/:id', validationUpdateCat, ctrl.update)
  .patch('/:id/vaccinated', validationUpdateStatusCat, ctrl.updateStatus)
  .delete('/:id', validationObjectId, ctrl.remove);

module.exports = router;
