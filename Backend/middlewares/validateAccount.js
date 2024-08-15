import Joi from "joi";

const accountRegistrationSchema = Joi.object({
  username: Joi.string().alphanum().min(5).max(16).required(),
  password: Joi.string().min(5).max(30).required(),
});

export function validateAccount(req, res, next) {
  const { error } = accountRegistrationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
}
