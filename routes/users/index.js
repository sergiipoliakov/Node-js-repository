const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');
const guard = require('../../helper/guard');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 2, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    return res.status(429).json({
      status: 'error',
      code: 429,
      message: 'Too Many Request',
    });
  },
});

router.post('/register', limiter, ctrl.reg);
router.post('/login', ctrl.login);
router.post('/logout', guard, ctrl.logout);

module.exports = router;