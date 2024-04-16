import { ApolloError } from 'apollo-server-express';

const isSeller = async (resolve, parent, args, ctx, info) => {
  if (!ctx.me.seller) {
    return new ApolloError('User is not authorized', 403);
  }

  return await resolve(parent, args, ctx, info);
};

export default {
  Mutation: {
    createShop: isSeller,
  },
};
