import { extend } from 'lodash';
import { saveImage, removeImage } from '../../functions';
import { ApolloError } from 'apollo-server-errors';
import { validationFormatter } from '../../functions';
import { shopValidate } from '../validators';

export default {
  Query: {
    getShops: async (_, { owner }, { Shop }) => {
      try {
        let query = {};
        query = owner && { owner };

        let shops = await Shop.find(query);
        return shops;
      } catch (err) {
        throw err;
      }
    },

    getShop: async (_, { shopId }, { shop }) => {
      return shop;
    },
  },

  Mutation: {
    createShop: async (_, { shop: inputShop }, { me, Shop }) => {
      try {
        inputShop.image = inputShop.image && (await inputShop.image);
        let { error } = shopValidate.validate(inputShop, {
          abortEarly: true,
        });

        if (error) {
          error = validationFormatter(error);
          throw new ApolloError('Validation Error.', 400, { error });
        }

        const { name, description, image } = inputShop;

        const newShop = new Shop({ name, description, owner: me.id });
        if (image) {
          newShop.image = await saveImage(image, 'shop', newShop._id);
        }

        const result = await newShop.save();
        return result;
      } catch (err) {
        throw err;
      }
    },

    updateShop: async (_, { shop: inputShop }, { shop }) => {
      try {
        inputShop.image = inputShop.image && (await inputShop.image);
        let { error } = shopValidate.validate(inputShop, {
          abortEarly: true,
        });

        if (error) {
          error = validationFormatter(error);
          throw new ApolloError('Validation Error.', 400, { error });
        }

        const { name, description, image } = inputShop;

        let updateShop = extend(shop, { name, description });

        if (image) {
          updateShop.image && (await removeImage(updateShop.image, 'shop'));

          updateShop.image = await saveImage(image, 'shop', updateShop._id);
        }

        let result = await updateShop.save();
        return result;
      } catch (err) {
        throw err;
      }
    },

    deleteShop: async (_, {}, { me, shop }) => {
      try {
        let deletedShop = await shop.remove();

        deletedShop.image && (await removeImage(deletedShop.image, 'shop'));

        return deletedShop;
      } catch (err) {
        throw err;
      }
    },
  },
};
