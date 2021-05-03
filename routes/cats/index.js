const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/cats');
const {
  validationQueryCat,
  validationCreateCat,
  validationUpdateCat,
  validationObjectId,
  validationUpdateStatusCat,
} = require('./valid-cat-router');
const guard = require('../../helper/guard');
const role = require('../../helper/role');
const { Gender } = require('../../helper/constants');

router
  .get('/', guard, validationQueryCat, ctrl.getAll)
  .post('/', guard, validationCreateCat, ctrl.create);
router.get('/man', guard, role(Gender.MALE), ctrl.onlyMan);
router.get('/woman', guard, role(Gender.FEMALE), ctrl.onlyFemale);

router
  .get('/:id', guard, validationObjectId, ctrl.getById)
  .put('/:id', guard, validationUpdateCat, ctrl.update)
  .delete('/:id', guard, ctrl.remove);

router.patch(
  '/:id/vaccinated',
  guard,
  validationUpdateStatusCat,
  ctrl.updateStatus,
);

module.exports = router;
