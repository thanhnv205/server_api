import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
    try {
        // điều hướng sang service
        const reatedBoard = await boardService.createNew(req.body)

        // trả vể kết quả client
        res.status(StatusCodes.CREATED).json(reatedBoard)
    } catch (error) { next(error) }
}

const getDetails = async (req, res, next) => {
    try {
        const board = await boardService.getDetails(req.params.id)
        res.status(StatusCodes.OK).json(board)
    } catch (error) { next(error) }
}


export const boardController = {
    createNew,
    getDetails
}