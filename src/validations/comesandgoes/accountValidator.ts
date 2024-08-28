import joi from "joi";

export const accountSchema = joi.object({
  totalAmount: joi.number().integer().required(),
  totalCurrency: joi.string().required(),
  userId: joi.number().integer().required(),
  clientId: joi.number().integer().required(),
});

export const transferManySchema = joi.object({
  // id : joi.number().integer().optional(),
  receivedAmount: joi.number().integer().required(),
  moneyCurrency: joi.string().required(),
  senderId: joi.number().integer().required(),
  receiverId: joi.number().integer().required(),
  intermediaryId: joi.number().integer().required(),
  receivedDate: joi.string().isoDate().required(),
  transferDate: joi.string().isoDate().required(),
});
export const debtSchema = joi.object({
  // id : joi.number().integer().optional(),
  debtAmount: joi.number().integer().required(),
  debtCurrency: joi.string().required(),
  debtorId: joi.number().integer().required(),
  creditorId: joi.number().integer().required(),
  debtIssuanceDate: joi.string().isoDate().required(),
  debtRepaymentDate: joi.string().isoDate().required(),
});
export const cashReceivableSchema = joi.object({
  // id : joi.number().integer().optional(),
  debtAmount: joi.number().integer().required(),
  debtCurrency: joi.string().required(),
  debtorId: joi.number().integer().required(),
  creditorId: joi.number().integer().required(),
  debtIssuanceDate: joi.string().isoDate().required(),
  debtRepaymentDate: joi.string().isoDate().required(),
});

export const userCashSema = joi.object({
  // id : joi.number().integer().optional(),
  totalCash: joi.number().integer().required(),
  cashCurrency: joi.string().required(),
  userId: joi.number().integer().required(),
});

export const customerSchema = joi.object({
  id : joi.number().integer().optional(),
  userId: joi.number().integer().optional(),
  clientName: joi.string().required(),
  clientSurname: joi.string().required(),
  clientPhone: joi.string().required(),
});