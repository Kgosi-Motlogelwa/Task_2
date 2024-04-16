import { ApolloError } from 'apollo-server-errors';
import { assign } from 'lodash';
import { validationFormatter } from '../../functions';
import { createOrderValidate, updateOrderValidate } from '../validators';

export default {
  Query: {
    getOrders: async (_, {}, { Order }) => {
      try {
        let orders = await Order.find().sort('-created');

        return orders;
      } catch (err) {
        throw err;
      }
    },

    getOrder: async (_, {}, { order }) => {
      return order;
    },

    getStatusValues: async (_, {}, { CartItem }) => {
      try {
        return CartItem.schema.path('status').enumValues;
      } catch (err) {
        throw err;
      }
    },

    listOrdersByUser: async (_, {}, { user, Order }) => {
      try {
        let orders = await Order.find({ user: user._id }).sort('-created');

        return orders;
      } catch (err) {
        throw err;
      }
    },

    listOrdersByShop: async (_, {}, { shop, Order }) => {
      try {
        let orders = await Order.find({ 'products.shop': shop._id }).sort(
          '-created'
        );

        return orders;
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    createOrder: async (_, { order: inputOrder }, { me, Order }) => {
      try {
        let { error } = createOrderValidate.validate(inputOrder, {
          abortEarly: true,
        });

        if (error) {
          error = validationFormatter(error);
          throw new ApolloError('Validation Error.', 400, { error });
        }

        let filterBody = assign(inputOrder, {
          user: me._id,
        });

        const newOrder = new Order(filterBody);

        const result = await newOrder.save();
        return result;
      } catch (err) {
        throw err;
      }
    },

    updateOrder: async (_, { cartItemId, status }, { Order }) => {
      try {
        let { error } = updateOrderValidate.validate(
          { cartItemId, status },
          {
            abortEarly: true,
          }
        );

        if (error) {
          error = validationFormatter(error);
          throw new ApolloError('Validation Error.', 400, { error });
        }

        let order = await Order.findOneAndUpdate(
          { 'products._id': cartItemId },
          {
            $set: {
              'products.$.status': status,
            },
          },
          { new: true, runValidators: true }
        );

        if (!order) {
          throw new ApolloError('Order Not Found!', 400);
        }

        return order;
      } catch (err) {
        throw err;
      }
    },
  },
};
