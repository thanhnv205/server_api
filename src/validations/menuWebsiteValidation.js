import { StatusCodes } from "http-status-codes";
import Joi from "joi";
const { default: ApiError } = require("~/utils/ApiError");

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    active: Joi.boolean().required().default(true),
    menu_name: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().trim().strict(),
    description: Joi.string().required().min(0).max(256).trim().strict(),
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

export const menuWebsiteValidation = {
  createNew,
};
