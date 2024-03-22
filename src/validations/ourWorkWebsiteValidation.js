import { StatusCodes } from "http-status-codes";
import Joi from "joi";
const { default: ApiError } = require("~/utils/ApiError");

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    active: Joi.boolean().required().default(true),
    title: Joi.string().required().trim().strict(),
    description: Joi.string().required().min(0).max(256).trim().strict(),
    slug: Joi.string().required().trim().strict(),

    images: Joi.array()
      .required()
      .items(
        Joi.object({
          image_name: Joi.string().trim().strict().allow(null),
        })
      )
      .default([]),
  });

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const ourWorkWebsiteValidation = {
  createNew,
};
