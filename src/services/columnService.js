import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (data) => {
    try {
        // gọi tới tầng model => lưu data vào Database
        const createdColumn = await columnModel.createNew(data)

        // lấy bản ghi column khi được tạo
        const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

        if (getNewColumn) {
            // cấu trúc nhận data trả về
            getNewColumn.cards = []

            // cập nhật columnIds trong collection boards
            await boardModel.pushColumnOrderIds(getNewColumn)
        }

        return getNewColumn
    } catch (error) { return error }
}

const deleteItem = async (columnId) => {
    try {
        const targetColumn = await columnModel.findOneById(columnId)

        if (!targetColumn) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found!')
        }
        // xóa column
        await columnModel.deleteOneById(columnId)

        // xóa toàn bộ cards thuộc column
        await cardModel.deleteManyByColumnId(columnId)

        // xóa columnId trong mảng columnOrderIds của Board
        await boardModel.pullColumnOrderIds(targetColumn)

        return { deleteMessage: 'Column and its Cards deleted successfully!' }
    } catch (error) { return error }
}

export const columnService = {
    createNew,
    deleteItem
}