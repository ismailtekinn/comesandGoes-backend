import joi from "joi";

export const loginSchema = joi.object({
  phone: joi.string().required(),
  password: joi.string().required(),
});
