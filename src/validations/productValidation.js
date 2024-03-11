import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    product_code: Joi.string().required().min(3).max(50).trim().strict(),
    product_name: Joi.string().required().min(3).max(50).trim().strict(),
    product_price: Joi.number().integer().min(0),
    slug: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    content: Joi.string().allow(null),
    product_image: Joi.string().trim().strict().allow(null),
    active: Joi.boolean().default(true),
    category_id: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
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

const deleteItem = async (req, res, next) => {
  const correctCondition = Joi.object({
    listId: Joi.array()
      .items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
      )
      .default([]),
  });

  try {
    await correctCondition.validateAsync(req.body);
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};

export const productValidation = {
  createNew,
  deleteItem,
};
