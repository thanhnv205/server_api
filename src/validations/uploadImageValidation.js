import { StatusCodes } from 'http-status-codes'
import Joi from 'joi'
import ApiError from '~/utils/ApiError'

const deleteImage = async (req, res, next) => {
  const correctCondition = Joi.object({
    file: Joi.string().required().trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.body)
    next()
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    )
  }
}

export const uploadImageValidation = {
  deleteImage
}
