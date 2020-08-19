import UserModel from '../models/user';
import bcrypt from 'bcrypt';
import { routes } from '../common/utils/vars';
import { validatePassword } from '../common/utils/auth-helper';

const saltRounds = parseInt(process.env.SALT_ROUNDS);

export function getUser(req, res, next) {
  console.log('User controller works');
}

export async function updateUserProfile(req, res, next) {
  try {
    const { name } = req.body;
    const id = req.session.user._id;

    await UserModel.updateOne({ _id: id }, { $set: { name } });

    req.session.messages = [`Your profile is updated successfully`];

    return res.redirect(routes.dashboard.profile);
  } catch (err) {
    return next(err);
  }
}

export async function updateUserPassword(req, res, next) {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const id = req.session.user._id;
    const email = req.session.user.email;

    const result = await validatePassword(email, currentPassword);

    if (result.status !== 200) {
      req.session.errors = ['Invalid current password'];
      return res.redirect(routes.dashboard.profile);
    }

    if (newPassword !== confirmPassword) {
      req.session.errors = ['Password confirmation does not match'];
      return res.redirect(routes.dashboard.profile);
    }

    const hash = await bcrypt.hash(newPassword, saltRounds);

    if (!hash) {
      throw hash;
    }

    await UserModel.updateOne({ _id: id }, { $set: { password: hash } });

    req.session.messages = [`Your password is updated successfully`];

    return res.redirect(routes.dashboard.profile);
  } catch (err) {
    return next(err);
  }
}
