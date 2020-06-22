export default function handleJwtError(err, req, res, next) {
  if (err?.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Invalid access token' });
  } else {
    return next();
  }
}
