import { AuthenticationError } from 'apollo-server-express';

const isGuest = async (resolve, parent, args, ctx, info) => {
  if (ctx.isAuth) {
    return new AuthenticationError(
      'You are logged in! Please log out to get access'
    );
  }

  return await resolve(parent, args, ctx, info);
};

export default {
  Query: {
    login: isGuest,
  },

  Mutation: {
    register: isGuest,
  },
};
