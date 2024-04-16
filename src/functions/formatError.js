import {
  UserInputError,
  ApolloError,
  AuthenticationError,
} from 'apollo-server-express';

import { NODE_ENV } from '../config';

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new UserInputError(message);
};

const handleDuplicateFieldsDB = (err) => {
  const value = Object.keys(err.keyValue);

  // const message = `Duplicate field value: ${value}, Please use another value!`;
  const message = `${value} Already exist!`;
  return new UserInputError(message);
};

const handleServerError = () => {
  const message = 'Something went very wrong!';

  return new ApolloError(message, 'INTERNAL_SERVER_ERROR');
};

const sendErrorDev = (err) => {
  return err;
};

const sendErrorProd = (err) => {
  let error;

  if (
    err instanceof ApolloError ||
    err instanceof UserInputError ||
    err instanceof AuthenticationError
  )
    error = err;
  if (err.name === 'CastError') error = handleCastErrorDB(err);
  if (err.code === 11000) error = handleDuplicateFieldsDB(err);
  //   if (error.name === 'ValidationError')
  //     error = handleValidationErrorDB(error);
  //   if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
  //   if (error.name === 'TokenExpiredError') error = handleExpiredError(error);

  return error;
};

export default (err) => {
  if (NODE_ENV !== 'development') {
    try {
      let { originalError } = err;
      let error = originalError
        ? sendErrorProd(originalError)
        : handleServerError();

      return error;
    } catch (err) {
      return handleServerError();
    }
  } else {
    return sendErrorDev(err);
  }
};
