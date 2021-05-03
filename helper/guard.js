const passport = require('passport');
const { HttpCode } = require('./constants');

require('../config/pasport');

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    let token = null;
    if (req.get('Authorization')) {
      token = req.get('Authorization').split(' ')[1];
    }

    if (!user || err || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Unauthorizad',
      });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
