import { map } from 'lodash';
import { ApolloError } from 'apollo-server-express';

const decreaseQuantity = async (resolve, parent, args, ctx, info) => {
  const products = args.order.products;
  let bulkOps = map(products, (item) => {
    return {
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity } },
      },
    };
  });

  await ctx.Product.bulkWrite(bulkOps, {});

  return await resolve(parent, args, ctx, info);
};

const increaseQuantity = async (resolve, parent, args, ctx, info) => {
  if (args.status === 'Cancelled') {
    if (!args.quantity) {
      return new ApolloError('Quantity is reaquired');
    }

    await ctx.Product.findByIdAndUpdate(
      ctx.product._id,
      { $inc: { quantity: args.quantity } },
      { new: true }
    );
  }

  return await resolve(parent, args, ctx, info);
};

export default {
  Mutation: {
    createOrder: decreaseQuantity,
    updateOrder: increaseQuantity,
  },
};
