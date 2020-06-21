import jwt from 'express-jwt';

const secret = process.env.ACCESS_TOKEN_SECRET;

export default function validateJwt() {
  return jwt({
    secret,
  }).unless({
    path: ['/api/signup', '/api/login', '/api/shorten', '/api/refresh_token'],
  });
}
