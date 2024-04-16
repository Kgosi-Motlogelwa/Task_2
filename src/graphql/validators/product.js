import Joi from 'joi';

const name = Joi.string().required().trim().min(3).max(255);

const description = Joi.string().required().trim().min(3);

const category = Joi.string().required().trim().min(3);

export const quantity = Joi.number().required().integer().positive();

const price = Joi.number().positive().required();

const image = Joi.object({
  filename: Joi.string().required(),
  mimetype: Joi.string().required(),
  encoding: Joi.string().required(),
  createReadStream: Joi.function().required(),
});

// Validate Create Product
const productValidate = Joi.object({
  name,
  description,
  category,
  quantity,
  price,
  image,
});

// export all schemas
export { productValidate };
