import Joi from 'joi';
import { name as customerName, email as customerEmail } from './user';
import { quantity } from './product';
import mongoose from 'mongoose';

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('objectId');
  }

  return value;
});

const deliveryAddress = Joi.object({
  street: Joi.string().required().trim(),
  city: Joi.string().required().trim(),
  state: Joi.string().required().trim(),
  zipcode: Joi.string().required().trim(),
  country: Joi.string().required().trim(),
});

const status = Joi.string()
  .valid('Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled')
  .default('Not processed');

const products = Joi.array()
  .items(
    Joi.object({
      product: objectId,
      quantity,
      shop: objectId,
      status,
    })
  )
  .unique((a, b) => a.product == b.product);

// Validate Create Order
const createOrderValidate = Joi.object({
  customerName,
  customerEmail,
  deliveryAddress,
  products,
});

// Validate Update Order
const updateOrderValidate = Joi.object({
  cartItemId: objectId,
  status,
});

// export all schemas
export { createOrderValidate, updateOrderValidate };
