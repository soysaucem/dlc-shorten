import {
  validatePassword,
  createUser,
  revokeRefreshToken,
  setTokensToCookie,
  createAccessToken,
  createRefreshToken,
} from '../common/utils/auth-helper';
import validateRefreshToken from '../common/utils/refresh-token-validation';
import User from '../models/user';
import { refreshTokenName } from '../common/utils/cookie-names';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const result = await validatePassword(email, password);

    if (result.status === 200) {
      setTokensToCookie(res, result.message.accessToken, result.refreshToken);
    }

    return res.status(result.status).json(result.message);
  } catch (err) {
    return next(err);
  }
}

export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const result = await createUser({ name, email, password });

    if (result.status === 200) {
      setTokensToCookie(res, result.message.accessToken, result.refreshToken);
    }

    return res.status(result.status).json(result.message);
  } catch (err) {
    return next(err);
  }
}

export async function logout(req, res, next) {
  try {
    const refreshToken = req.cookies[refreshTokenName];

    const result = await revokeRefreshToken(res, refreshToken);

    return res.json({ result, redirect: '/' });
  } catch (err) {
    return next(err);
  }
}

export async function refreshToken(req, res) {
  const payload = await validateRefreshToken(req);

  if (payload) {
    const user = (await User.findOne({ _id: payload.id }))?._doc;

    if (user) {
      setTokensToCookie(res, createAccessToken(user), createRefreshToken(user));
      return res.status(200).json({ ok: true });
    }
  }

  return res.status(401).json({ accessToken: '' });
}
