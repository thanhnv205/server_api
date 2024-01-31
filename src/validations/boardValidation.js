import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict(),
        description: Joi.string().required().min(3).max(256).trim().strict()
    })

    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false })
        // validate hợp lệ => qua tầng contrller
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    }
}


const update = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().min(3).max(50).trim().strict(),
        description: Joi.string().min(3).max(256).trim().strict()
    })

    try {
        await correctCondition.validateAsync(req.body, {
            abortEarly: false,
            allowUnknown: true // không cần đẩy lên tất cả các field
        })
        // validate hợp lệ => qua tầng contrller
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    }
}

export const boardValidation = {
    createNew,
    update
}