import Token from '../../models/token';
import jwt from 'jsonwebtoken';
import { refreshTokenName } from '../utils/cookie-names';

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

export default async function validateRefreshToken(req) {
  try {
    // check if the refresh token is still valid or not
    const refreshToken = req.cookies[refreshTokenName];
    const isBlacklistToken = await Token.findOne({ value: refreshToken });

    if (isBlacklistToken) {
      throw Error('Invalid refresh token');
    }

    const payload = jwt.verify(refreshToken, refreshTokenSecret);

    return payload;
  } catch (err) {
    console.log(err);
    return null;
  }
}
