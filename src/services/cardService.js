import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (data) => {
    try {
        // gọi tới tầng model => lưu data vào Database
        const createdCard = await cardModel.createNew(data)

        // lấy bản ghi card khi được tạo
        const getNewCard = await cardModel.findOneById(createdCard.insertedId)

        if (getNewCard) {
            // cập nhật cardOrderIds trong collection column
            await columnModel.pushCardOrderIds(getNewCard)
        }

        return getNewCard
    } catch (error) { return error }
}

export const cardService = {
    createNew
}