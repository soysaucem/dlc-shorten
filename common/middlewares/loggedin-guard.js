'use strict';

export default async function loggedinGuard(req, res, next) {
  try {
    const url = req.url;

    if (req.session.user && (url === '/login' || url === '/signup')) {
      return res.redirect('/');
    }

    return next();
  } catch (err) {
    return next(err);
  }
}
