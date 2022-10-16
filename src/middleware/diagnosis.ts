import { RequestHandler } from 'express';
import joi from 'joi';
import APIError from '../utilities/ApiError';

const validateQuerySchema = (data) => {
  const schema = joi.object({
    gender: joi.string().valid('male', 'female').required(),
    yearOfBirth: joi.number().max(new Date().getFullYear()).required(),
    symptoms: joi.string().required(),
  });
  return schema.validate(data);
};

export const validateDiagnosisQuery: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { error } = validateQuerySchema(req.query);
    if (error) throw new APIError(error.details[0].message, 400);
    next();
  } catch (error) {
    next(error);
  }
};
