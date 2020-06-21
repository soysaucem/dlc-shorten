import {
  validatePassword,
  createUser,
  revokeRefreshToken,
  setTokenToCookie,
  createAccessToken,
} from '../common/utils/auth-helper';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Token from '../models/token';
import { refreshTokenName } from '../common/utils/cookie-names';

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const result = await validatePassword(email, password);

    if (result.status === 200) {
      setTokenToCookie(res, refreshTokenName, result.refreshToken);
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
      setTokenToCookie(res, refreshTokenName, result.refreshToken);
    }

    return res.status(result.status).json(result.message);
  } catch (err) {
    return next(err);
  }
}

export async function logout(req, res, next) {
  try {
    const refreshToken = req.cookies[refreshTokenName];

    return await revokeRefreshToken(res, refreshToken);
  } catch (err) {
    return next(err);
  }
}

export async function refreshToken(req, res) {
  try {
    const refreshToken = req.cookies[refreshTokenName];
    const isBlacklistToken = await Token.findOne({ value: refreshToken });

    if (isBlacklistToken) {
      throw Error('Unvalid token');
    }

    const payload = jwt.verify(refreshToken, refreshTokenSecret);
    const user = (await User.findOne({ _id: payload.id }))?._doc;

    return res.status(200).json({ accessToken: createAccessToken(user) });
  } catch (err) {
    return res.status(401).json({ accessToken: '' });
  }
}
