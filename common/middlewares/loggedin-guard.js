import validateRefreshToken from '../utils/refresh-token-validation';

export default async function loggedinGuard(req, res, next) {
  try {
    const payload = await validateRefreshToken(req);
    const url = req.url;

    if (payload) {
      res.locals.loggedIn = true;

      if (url === '/login' || url === '/signup') {
        return res.redirect('/');
      }
    }

    return next();
  } catch (err) {
    return next(err);
  }
}
