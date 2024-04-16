import { serializeUser, signToken, validationFormatter } from '../../functions';
import { registerValidate, loginValidate } from '../validators';
import { pick, extend } from 'lodash';
import { UserInputError } from 'apollo-server-errors';

export default {
  Query: {
    login: async (_, args, { User }) => {
      try {
        // validate data
        let { error } = loginValidate.validate(args, { abortEarly: true });

        if (error) {
          error = validationFormatter(error);
          throw new UserInputError('Validation Error.', { error });
        }

        // Find User By Email
        let user = await User.findOne({ email: args.email }).select(
          '+password'
        );

        // Check User if Not Exist or Password Not Correct
        if (!user || !(await user.comparePassword(args.password))) {
          throw new UserInputError('Incorrect email or password', 400);
        }

        //Create Token
        const token = signToken(user._id);

        // filter fields to send it in response
        user = serializeUser(user);
        return {
          token,
          user,
        };
      } catch (err) {
        throw err;
      }
    },

    getUsers: async (_, {}, { User }) => {
      try {
        const users = await User.find();

        return users;
      } catch (err) {
        throw err;
      }
    },

    getUser: async (_, { userId }, { user }) => {
      user = serializeUser(user);
      return user;
    },

    getMe: async (_, __, { me }) => {
      me = serializeUser(me);
      return me;
    },
  },

  Mutation: {
    register: async (_, args, { User }) => {
      try {
        // validate data
        let { error } = registerValidate.validate(args, { abortEarly: true });

        if (error) {
          error = validationFormatter(error);
          throw new UserInputError('Validation Error.', { error });
        }

        // Find User By Email and Check his if Deja Exist
        // let user = await User.findOne({ email: args.email });

        // if (user) {
        //   throw new ApolloError(
        //     `Duplicate field value: ${args.email}. Please use another value!`,
        //     400
        //   );
        // }

        // Create New User
        let user = await User.create(pick(args, ['name', 'email', 'password']));

        //Create Token
        const token = signToken(user._id);

        // filter fields to send it in response
        user = serializeUser(user);
        return {
          message: 'User signup  successfully',
          token,
          user,
        };
      } catch (err) {
        throw err;
      }
    },

    updateMe: async (_, args, { me }) => {
      try {
        // TODO: validation fields
        const user = extend(me, args);

        let result = await user.save();

        // filter fields to send it in response
        result = serializeUser(result);
        return result;
      } catch (err) {
        throw err;
      }
    },

    deleteMe: async (_, {}, { me }) => {
      try {
        let deletedUser = await me.remove();

        // filter fields to send it in response
        deletedUser = serializeUser(deletedUser);
        return deletedUser;
      } catch (err) {
        throw err;
      }
    },

    updateUser: async (_, args, { me, User }) => {},

    deleteUser: async (_, { userId }, { me, User }) => {},
  },
};
