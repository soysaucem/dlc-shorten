import silientRefresh from './silient-refresh';

export default async function handleJwtError(err, req, res, next) {
  if (err?.name === 'UnauthorizedError') {
    const result = await silientRefresh(req, res);

    if (!result) {
      return res.redirect('/login');
    }

    return next();
  } else {
    return next();
  }
}
