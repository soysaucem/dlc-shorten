import validateRefreshToken from '../utils/refresh-token-validation';
import { createAccessToken } from '../utils/auth-helper';
import User from '../../models/user';

export default async function silientRefresh(req, res) {
  const payload = await validateRefreshToken(req);

  if (payload) {
    const user = (await User.findOne({ _id: payload.id }))?._doc;

    if (user) {
      res.cookie('app_access_token', createAccessToken(user));
      return true;
    }
  }

  return false;
}
