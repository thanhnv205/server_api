import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    image: Joi.string().uri().trim().strict().allow(null)
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // validate hợp lệ => qua tầng controller
    next()
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    )
  }
}

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    slug: Joi.string().trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    image: Joi.string().uri().trim().strict().allow(null)
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    // validate hợp lệ => qua tầng contrller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const postValidation = {
  createNew,
  update
}
