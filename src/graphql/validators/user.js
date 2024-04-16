import Joi from 'joi';

export const name = Joi.string().required().lowercase().trim().min(3);

export const email = Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'io'] } })
  .required()
  .lowercase()
  .trim();

const password = Joi.string().required().min(8);
const confirmPassword = Joi.ref('password');

// Validate Login Schema
const loginValidate = Joi.object({
  email,
  password,
});

// Validate Register Schema
const registerValidate = Joi.object({
  name,
  email,
  password,
  confirmPassword,
}).with('password', 'confirmPassword');

// export all schemas
export { loginValidate, registerValidate };
