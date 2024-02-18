import { permissionsModel } from '~/models/permissionsModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const getAllItems = async () => {
  try {
    return await permissionsModel.getAllItems()
  } catch (error) {
    return error
  }
}

const getByName = async (name) => {
  try {
    return await permissionsModel.getByName(name)
  } catch (error) {
    return error
  }
}

const createNew = async (data) => {
  try {
    // gọi tới tầng model => lưu newPermission vào Database
    const created = await permissionsModel.createNew(data)

    // lấy bản ghi post khi được tạo
    return await permissionsModel.findOneById(created.insertedId)
  } catch (error) {
    return error
  }
}

const getDetails = async (data) => {
  try {
    const permissions = await permissionsModel.getDetails(data)

    if (!permissions) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'permissions not found!')
    }

    return permissions
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, body) => {
  try {
    const updateData = {
      ...body,
      updatedAt: Date.now()
    }
    return await permissionsModel.update(id, updateData)
  } catch (error) { return error }
}

const active = async (listId, body) => {
  try {
    const updateData = {
      active: body.active,
      updatedAt: Date.now()
    }

    return await permissionsModel.active(listId, updateData)
  } catch (error) { return error }
}

const deleteItem = async (id) => {
  try {
    // xóa item
    await permissionsModel.deleteOneById(id)
    return { deleteMessage: 'Delete posts successfully!' }
  } catch (error) { return error }
}

export const permissionsService = {
  getAllItems,
  getByName,
  createNew,
  getDetails,
  update,
  active,
  deleteItem
}