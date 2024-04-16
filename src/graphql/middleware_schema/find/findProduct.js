import { ApolloError } from 'apollo-server-express';

const findProduct = async (resolve, parent, args, ctx, info) => {
  if (info.fieldName === 'updateOrder' && args.status !== 'Cancelled') {
    return await resolve(parent, args, ctx, info);
  }

  const product = await ctx.Product.findById(args.productId);

  if (!product) {
    return new ApolloError('Product not found', 400);
  }

  ctx.product = product;

  return await resolve(parent, args, ctx, info);
};

export default {
  Query: {
    getProduct: findProduct,
    listRelatedProducts: findProduct,
  },

  Mutation: {
    updateProduct: findProduct,
    deleteProduct: findProduct,

    updateOrder: findProduct,
  },
};
