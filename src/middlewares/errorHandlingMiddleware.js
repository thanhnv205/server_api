/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'

export const errorHandlingMiddleware = (err, req, res, next) => {
    if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

    // trả về error
    const responseError = {
        statusCode: err.statusCode,
        message: err.message || StatusCodes[err.statusCode],
        stack: err.stack
    }


    if (env.BUILD_MODE !== 'dev') delete responseError.stack

    // trả về Front-end
    res.status(responseError.statusCode).json(responseError)
}