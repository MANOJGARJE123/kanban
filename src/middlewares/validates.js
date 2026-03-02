import Joi, { valid } from 'joi';

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().optional()
});

function validateRegister(req, res, next) {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ message: error.details.map(d => d.message).join(', ') });
  }
  next();
}

export default validateRegister;