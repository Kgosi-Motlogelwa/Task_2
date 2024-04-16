import typeDefs from '../typeDefs';
import resolvers from '../resolvers';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'apollo-server-express';

import authMiddleware from './auth';
import guestMiddleware from './guest';
import ownerMiddleware from './owner';
import sellerMiddleware from './seller';
import findMiddleware from './find';
import quantityMiddleware from './quantity';

const middleware = [
  authMiddleware,
  guestMiddleware,
  ...findMiddleware,
  ownerMiddleware,
  sellerMiddleware,
  quantityMiddleware,
];

export const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  ...middleware
);
