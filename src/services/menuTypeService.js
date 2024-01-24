import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { menuTypeModel } from '~/models/menuTypeModel'

const getAllItems = async () => {
  try {
    return await menuTypeModel.getAllItems()
  } catch (error) {
    return error
  }
}

const getByName = async (name) => {
  try {
    return await menuTypeModel.getByName(name)
  } catch (error) {
    return error
  }
}

const createNew = async (data) => {
  try {
    const createdMenuType = await menuTypeModel.createNew(data)

    return await menuTypeModel.findOneById(createdMenuType.insertedId)
  } catch (error) {
    return error
  }
}

export const menuTypeService = {
  getAllItems,
  getByName,
  createNew
}