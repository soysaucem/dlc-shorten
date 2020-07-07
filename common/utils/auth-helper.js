import bcrypt from 'bcrypt';
import User from '../../models/user';

const saltRounds = parseInt(process.env.SALT_ROUNDS);

// helper functions
export function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}

export async function checkEmailExist(email) {
  return await User.exists({ email });
}

export async function validatePassword(email, password) {
  const errorMessage = 'Invalid email or password!';
  const user = await User.findOne({ email });

  if (!user) {
    return {
      status: 401,
      message: errorMessage,
      redirect: '/login',
    };
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return {
      status: 401,
      message: errorMessage,
      redirect: '/login',
    };
  }

  return {
    user,
    status: 200,
    message: 'Ok',
    redirect: '/',
  };
}

export async function createUser(user) {
  const exist = await checkEmailExist(user.email);

  if (exist) {
    return {
      status: 400,
      message: 'Email has been taken',
      redirect: '/signup',
    };
  }

  // hash password and store to database
  const hash = await bcrypt.hash(user.password, saltRounds);

  if (!hash) {
    throw hash;
  }

  const createdUser = await User.create({
    name: user.name,
    email: user.email,
    password: hash,
  });

  return {
    status: 200,
    message: 'Ok',
    redirect: '/',
    user: createdUser,
  };
}
