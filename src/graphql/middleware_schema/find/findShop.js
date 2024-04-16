import { ApolloError } from 'apollo-server-express';

const findShop = async (resolve, parent, args, ctx, info) => {
  const shop = await ctx.Shop.findById(args.shopId);

  if (!shop) {
    return new ApolloError('Shop not found', 400);
  }

  ctx.shop = shop;

  return await resolve(parent, args, ctx, info);
};

export default {
  Query: {
    getShop: findShop,
    listOrdersByShop: findShop,
  },

  Mutation: {
    createProduct: findShop,
    updateProduct: findShop,
    deleteProduct: findShop,

    updateShop: findShop,
    deleteShop: findShop,
  },
};
