import request from 'request';

const stripeAuth = async (resolve, parent, args, ctx, info) => {
  return await resolve(parent, args, ctx, info);
};

export default {
  Mutation: {
    updateUser: stripeAuth,
  },
};
