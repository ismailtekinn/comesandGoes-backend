import joi from "joi";

export const registerSchema = joi.object({
  id: joi.number().optional(),
  username: joi.string().optional(),
  email: joi.string().optional(),
  phone: joi.string().optional(),
  password: joi.string().required(),
  name: joi.string().required(),
  surname: joi.string().required(),
  roleId: joi.number().required(),
});
