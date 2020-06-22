import silientRefresh from './silient-refresh';

export default async function handleJwtError(err, req, res, next) {
  if (err?.name === 'UnauthorizedError') {
    if (err?.message === 'jwt expired') {
      const result = await silientRefresh(req, res);

      if (!result) {
        return res.redirect('/login');
      }

      return next();
    }
    return res.status(401).json({ error: 'Invalid access token' });
  } else {
    return next();
  }
}
