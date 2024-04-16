import express from 'express';
import consola from 'consola';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import { join } from 'path';
import { graphqlUploadExpress } from 'graphql-upload';
import path from 'path';

import {
  BASE_URL,
  MONGODB_URI,
  MONGODB_PASSWORD,
  NODE_ENV,
  PORT,
} from './config';

import * as models from './models';
import AuthMiddleware from './middlewares/auth';
import { schema } from './graphql/middleware_schema';
import { formatError } from './functions';

// Initialize the App
const app = express();

const root = join(__dirname, '..', 'client', 'dist');

// Setting up the middlewares
app.use(graphqlUploadExpress());
app.use(express.static(join(__dirname, './uploads')));

app.use(AuthMiddleware);

const server = new ApolloServer({
  schema,
  uploads: false,
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    const { me, isAuth } = req;

    return { me, isAuth, ...models };
  },
  formatError,
});

// starting Apollo-Express-Server
const startApp = async () => {
  try {
    // 1. Connect to database (optional)
    const DB = MONGODB_URI.replace('<password>', MONGODB_PASSWORD);
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    consola.success({
      message: 'Successfully connected to database',
      badge: true,
    });

    if (NODE_ENV === 'production') {
      app.use(express.static(root));

      app.get('*', (req, res) => {
        res.sendFile('index.html', { root });
      });
    } else {
      app.get('/', (req, res) => {
        res.send('Application running on development...');
      });
    }

    // 2. start Apollo-Express-Server
    server.applyMiddleware({ app, path: '/api', cors: true });

    // 3. Start the server on a particular port
    app.listen(PORT || 5000, () => {
      consola.success({
        message: `App running on port ${BASE_URL}`,
        badge: true,
      });
    });
  } catch (err) {
    consola.error({
      message: `Unable to start the server ${err.message}`,
      badge: true,
    });
  }
};

startApp();
