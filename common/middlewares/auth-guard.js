'use strict';

export default async function authGuard(req, res, next) {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    return next();
  } catch (err) {
    return next(err);
  }
}
