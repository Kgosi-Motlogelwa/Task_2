import Joi from 'joi';

const name = Joi.string().required().trim().min(3).max(255);

const description = Joi.string().required().trim().min(3);

const image = Joi.object({
  filename: Joi.string().required(),
  mimetype: Joi.string().required(),
  encoding: Joi.string().required(),
  createReadStream: Joi.function().required(),
});

// Validate Create and update Shop
const shopValidate = Joi.object({
  name,
  description,
  image,
});

// export all schemas
export { shopValidate };
