import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    category_name: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    active: Joi.boolean().default(true)
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

export const categoryPostValidation = {
  createNew
}
