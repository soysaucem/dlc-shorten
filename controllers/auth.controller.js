'use strict';

import { validatePassword, createUser } from '../common/utils/auth-helper';

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const result = await validatePassword(email, password);

    if (result.status === 200) {
      req.session.user = result.user;
    } else {
      req.session.errors = [result.message];
    }

    return res.redirect(result.redirect);
  } catch (err) {
    return next(err);
  }
}

export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const result = await createUser({ name, email, password });

    if (result.status === 200) {
      req.session.user = result.user;
    } else {
      req.session.errors = [result.message];
    }

    return res.redirect(result.redirect);
  } catch (err) {
    return next(err);
  }
}

export async function logout(req, res, next) {
  try {
    req.session.user = null;
    return res.redirect('/');
  } catch (err) {
    return next(err);
  }
}
