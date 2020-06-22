import validateRefreshToken from '../utils/refresh-token-validation';

export default async function authGuard(req, res, next) {
  try {
    const payload = await validateRefreshToken(req);

    if (!payload) {
      return res.redirect('/login');
    }

    return next();
  } catch (err) {
    return next(err);
  }
}
