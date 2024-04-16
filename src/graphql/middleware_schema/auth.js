import { AuthenticationError } from 'apollo-server-express';

const isAuth = async (resolve, parent, args, ctx, info) => {
  if (!ctx.isAuth) {
    return new AuthenticationError(
      'You are not logged in! Please log in to get access'
    );
  }

  return await resolve(parent, args, ctx, info);
};

export default {
  // User: {
  //   email: isAuth,
  //   seller: isAuth,
  //   createdAt: isAuth,
  //   updatedAt: isAuth,
  // },

  Query: {
    getUsers: isAuth,
    getUser: isAuth,
    getMe: isAuth,
    getOrders: isAuth,
    listOrdersByUser: isAuth,
    listOrdersByShop: isAuth,
  },

  Mutation: {
    updateMe: isAuth,
    deleteMe: isAuth,
    updateUser: isAuth,
    deleteUser: isAuth,

    createShop: isAuth,
    updateShop: isAuth,
    deleteShop: isAuth,

    createProduct: isAuth,
    updateProduct: isAuth,
    deleteProduct: isAuth,

    createOrder: isAuth,
    updateOrder: isAuth,
  },
};
