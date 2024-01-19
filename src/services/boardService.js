import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'


const createNew = async (data) => {
    try {
        const newBoard = {
            ...data,
            slug: slugify(data.title)
        }

        // gọi tới tầng model => lưu newBoard vào Database
        const createdBoard = await boardModel.createNew(newBoard)

        // lấy bản ghi board khi được tạo
        const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

        return getNewBoard
    } catch (error) { return error }
}

const getDetails = async (data) => {
    try {
        const board = await boardModel.getDetails(data)
        if (!board) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
        }

        return board
    } catch (error) { return error }
}


export const boardService = {
    createNew,
    getDetails
}