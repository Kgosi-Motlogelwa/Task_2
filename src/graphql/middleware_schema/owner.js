import { ApolloError } from 'apollo-server-express';

const isOwner = async (resolve, parent, args, ctx, info) => {
  if (ctx.shop.owner._id != ctx.me.id) {
    return new ApolloError('User is not authorized', 403);
  }

  return await resolve(parent, args, ctx, info);
};

export default {
  Query: {
    listOrdersByShop: isOwner,
  },

  Mutation: {
    updateShop: isOwner,
    deleteShop: isOwner,

    createProduct: isOwner,
    updateProduct: isOwner,
    deleteProduct: isOwner,
  },
};
