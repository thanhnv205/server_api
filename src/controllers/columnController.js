import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNew = async (req, res, next) => {
    try {
        // điều hướng sang service
        const reatedColumn = await columnService.createNew(req.body)

        res.status(StatusCodes.CREATED).json(reatedColumn)
    } catch (error) { next(error) }
}


const deleteItem = async (req, res, next) => {
    try {
        const columnId = req.params.id
        // điều hướng sang service
        const result = await columnService.deleteItem(columnId)

        res.status(StatusCodes.OK).json(result)
    } catch (error) { next(error) }
}

export const columnController = {
    createNew,
    deleteItem
}