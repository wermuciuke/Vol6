import Joi from "joi";

const attendeeSchema = Joi.object({
  firstName: Joi.string().alphanum().min(2).max(30).required(),
  lastName: Joi.string().alphanum().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "lt", "ru"] },
    })
    .required(),
  age: Joi.number().integer().min(0).max(120).required(),
});

export function validateAttendee(req, res, next) {
  const { error } = attendeeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  next();
}
