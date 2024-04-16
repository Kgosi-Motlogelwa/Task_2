import { ApolloError } from 'apollo-server-express';

const findOrder = async (resolve, parent, args, ctx, info) => {
  const order = await ctx.Order.findById(args.orderId)
    .populate('products.product')
    .populate({
      path: 'products.shop',
      populate: 'owner',
    })
    .populate('user');

  if (!order) {
    return new ApolloError('Order not found', 400);
  }

  ctx.order = order;

  return await resolve(parent, args, ctx, info);
};

export default {
  Query: {
    getOrder: findOrder,
  },
};
