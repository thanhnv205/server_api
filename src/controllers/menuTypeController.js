import { StatusCodes } from 'http-status-codes'
import { menuTypeService } from '~/services/menuTypeService'


const getAllItems = async (req, res, next) => {
  try {
    const menuTypes = await menuTypeService.getAllItems()
    res.status(StatusCodes.OK).json(menuTypes)
  } catch (error) {
    next(error)
  }
}

const createNew = async (req, res, next) => {
  try {
    const { type_name } = req.body

    const existingName = await menuTypeService.getByName(type_name)

    if (existingName) {
      return res.status(StatusCodes.BAD_REQUEST).json({ messge: 'Tên loại menu đã tồn tại!' })
    }

    const createdMenuType = await menuTypeService.createNew(req.body)
    console.log('createdMenuType', createdMenuType)
    res.status(StatusCodes.CREATED).json(createdMenuType)
  } catch (error) {
    next(error)
  }
}

export const menuTypeController = {
  getAllItems,
  createNew
}