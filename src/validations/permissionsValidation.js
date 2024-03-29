import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    active: Joi.boolean().default(true),
    permission_name: Joi.string().required().min(3).max(50).trim().strict(),
    permission_key: Joi.string().required().trim().strict(),
    permission_code: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().trim().strict().allow(''),
    icon: Joi.string().trim().strict().allow('')
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

const active = async (req, res, next) => {
  const correctCondition = Joi.object({
    listId: Joi.array()
      .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
      .default([])
  })

  try {
    await correctCondition.validateAsync(req.params)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const deleteItem = async (req, res, next) => {
  const correctCondition = Joi.object({
    _id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })

  try {
    await correctCondition.validateAsync(req.params)
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const permissionsValidation = {
  createNew,
  update,
  active,
  deleteItem
}
