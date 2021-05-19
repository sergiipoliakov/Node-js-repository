const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/users');
const guard = require('../../helper/guard');
const rateLimit = require('express-rate-limit');
const uploadAvatar = require('../../helper/upload-avatar');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  max: 2, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    return res.status(429).json({
      status: 'error',
      code: 429,
      message: 'Too Many Requests',
    });
  },
});

router.post('/register', limiter, ctrl.reg);
router.post('/login', ctrl.login);
router.post('/logout', guard, ctrl.logout);
router.patch(
  '/avatars',
  guard,
  uploadAvatar.single('avatar'),
  ctrl.updateAvatar,
);

router.get('/verify/:token', ctrl.verify);
router.post('/verify', ctrl.repeatEmailVerify);

module.exports = router;
