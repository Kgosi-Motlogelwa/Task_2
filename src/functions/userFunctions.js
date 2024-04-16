import { JWT_SECRET, JWT_EXPIRES_IN } from '../config';
import { pick } from 'lodash';
import jwt from 'jsonwebtoken';

export const signToken = (id) => {
  return jwt.sign({ id: id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const serializeUser = (user) =>
  pick(user, [
    '_id',
    'name',
    'email',
    'about',
    'seller',
    'createdAt',
    'updatedAt',
  ]);
