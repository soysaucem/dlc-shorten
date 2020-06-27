import silientRefresh from './silient-refresh';

export default async function (req, res, next) {
  await silientRefresh(req, res);

  return next();
}
