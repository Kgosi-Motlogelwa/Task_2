import { ApolloError } from 'apollo-server-errors';
import { extend } from 'lodash';
import { saveImage, removeImage } from '../../functions';
import { validationFormatter } from '../../functions';
import { productValidate } from '../validators';

// TODO: stripe method

export default {
  Query: {
    getProducts: async (_, { search, category }, { Product }) => {
      try {
        let query = {};
        if (search) query.name = { $regex: search, $options: 'i' };
        if (category && category != 'all') query.category = category;

        return await Product.find(query).sort('-createdAt');
      } catch (err) {
        throw err;
      }
    },

    getProduct: async (_, {}, { product }) => {
      return product;
    },

    listProductsByShop: async (_, { shopId }, { Product }) => {
      try {
        return await Product.find({ shop: shopId }).sort('-createdAt');
      } catch (err) {
        throw err;
      }
    },

    listLatestProducts: async (_, { limit = 5 }, { Product }) => {
      try {
        let products = await Product.find().sort('-createdAt').limit(limit);

        return products;
      } catch (err) {
        throw err;
      }
    },

    listRelatedProducts: async (_, { limit = 5 }, { product, Product }) => {
      try {
        let products = await Product.find({
          _id: { $ne: product._id },
          category: product.category,
        }).limit(limit);

        return products;
      } catch (err) {
        throw err;
      }
    },

    listCategories: async (_, {}, { Product }) => {
      try {
        let categories = await Product.distinct('category', {});

        return categories;
      } catch (err) {
        throw err;
      }
    },
  },

  Mutation: {
    createProduct: async (_, { product: inputProduct }, { shop, Product }) => {
      try {
        inputProduct.image = inputProduct.image && (await inputProduct.image);
        let { error } = productValidate.validate(inputProduct, {
          abortEarly: true,
        });

        if (error) {
          error = validationFormatter(error);
          throw new ApolloError('Validation Error.', 400, { error });
        }

        const { name, description, category, quantity, price, image } =
          inputProduct;

        let newProduct = new Product({
          name,
          description,
          category,
          quantity,
          price,
          shop: shop._id,
        });

        if (image) {
          newProduct.image = await saveImage(image, 'product', newProduct._id);
        }

        let result = await newProduct.save();
        return result;
      } catch (err) {
        throw err;
      }
    },

    updateProduct: async (_, { product: inputProduct }, { product }) => {
      try {
        inputProduct.image = inputProduct.image && (await inputProduct.image);
        let { error } = productValidate.validate(inputProduct, {
          abortEarly: true,
        });

        if (error) {
          error = validationFormatter(error);
          throw new ApolloError('Validation Error.', 400, { error });
        }

        const { name, description, category, quantity, price, image } =
          inputProduct;

        let updateProduct = extend(product, {
          name,
          description,
          category,
          quantity,
          price,
        });

        if (image) {
          updateProduct.image &&
            (await removeImage(updateProduct.image, 'product'));

          updateProduct.image = await saveImage(
            image,
            'product',
            updateProduct._id
          );
        }

        let result = await updateProduct.save();
        return result;
      } catch (err) {
        throw err;
      }
    },

    deleteProduct: async (_, {}, { product }) => {
      try {
        let deletedProduct = await product.remove();

        deletedProduct.image &&
          (await removeImage(deletedProduct.image, 'product'));

        return deletedProduct;
      } catch (err) {
        throw err;
      }
    },
  },
};
