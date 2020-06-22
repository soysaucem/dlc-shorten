import bcrypt from 'bcrypt';
import User from '../../models/user';
import Token from '../../models/token';
import jwt from 'jsonwebtoken';
import * as cookieNames from '../utils/cookie-names';
import { v4 } from 'uuid';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const envMode = process.env.MODE;
const saltRounds = parseInt(process.env.SALT_ROUNDS);

// helper functions

export function createAccessToken(user) {
  const token = jwt.sign(
    { sub: user.id, id: user._id, email: user.email },
    accessTokenSecret,
    {
      expiresIn: '20s',
    }
  );

  return token;
}

export function createRefreshToken(user) {
  const token = jwt.sign(
    { sub: user.id, id: user._id, email: user.email },
    refreshTokenSecret,
    {
      expiresIn: '30d',
    }
  );

  return token;
}

export function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

export async function checkEmailExist(email) {
  return await User.exists({ email });
}

export async function validatePassword(email, password) {
  const user = (await User.findOne({ email }))?._doc;
  const hashedPassword = user ? user.password : '';

  const match = await bcrypt.compare(password, hashedPassword);

  if (match instanceof Error) {
    throw match;
  }

  if (match) {
    return {
      status: 200,
      refreshToken: createRefreshToken(user),
      message: {
        ...omitPassword(user),
        accessToken: createAccessToken(user),
        redirect: '/',
      },
    };
  } else {
    return {
      status: 403,
      message: { error: 'Invalid email or password' },
    };
  }
}

export async function createUser(user) {
  const exist = await checkEmailExist(user.email);

  if (exist) {
    return {
      status: 400,
      message: { error: 'Email has been taken' },
    };
  }

  // hash password and store to database
  const hash = await bcrypt.hash(user.password, saltRounds);

  if (hash instanceof Error) {
    throw hash;
  }

  const createdUser = (
    await User.create({
      _id: v4(),
      name: user.name,
      email: user.email,
      password: hash,
      createdAt: Date.now(),
    })
  )._doc;

  return {
    status: 200,
    refreshToken: createRefreshToken(user),
    message: {
      ...omitPassword(createdUser),
      accessToken: createAccessToken(createdUser),
      redirect: '/',
    },
  };
}

export async function revokeRefreshToken(res, token) {
  await Token.create({ _id: v4(), value: token });

  clearCookies(res);

  return true;
}

export function setTokensToCookie(res, accessToken, refreshToken) {
  return res
    .cookie(cookieNames.accessTokenName, accessToken)
    .cookie(cookieNames.refreshTokenName, refreshToken, {
      httpOnly: true,
      secure: !(envMode === 'development'),
    });
}

function clearCookies(res) {
  return res
    .clearCookie(cookieNames.refreshTokenName)
    .clearCookie(cookieNames.accessTokenName);
}
