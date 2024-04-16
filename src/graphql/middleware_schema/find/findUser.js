import { ApolloError } from 'apollo-server-express';

const findUser = async (resolve, parent, args, ctx, info) => {
  const user = await ctx.User.findById(args.userId);

  if (!user) {
    return new ApolloError('User not found', 400);
  }

  ctx.user = user;

  return await resolve(parent, args, ctx, info);
};

export default {
  Query: {
    getUser: findUser,
    listOrdersByUser: findUser,
  },
};
