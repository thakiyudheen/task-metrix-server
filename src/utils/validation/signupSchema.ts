import Joi from 'joi';

const signupValidationSchema = Joi.object({
  username: Joi.string().min(3).required().messages({
    'any.required': `"Username" is required`,
  }),
  email: Joi.string().email().required().messages({
    'any.required': `"Email" is required`,
    'string.email': `"Email" must be a valid format`,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': `"Password" is required`,
    'string.min': `"Password" must be at least 6 characters long`,
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.required': `"Confirm Password" is required`,
    'any.only': `"Confirm Password" must match Password`,
  }),
});

export default signupValidationSchema;
