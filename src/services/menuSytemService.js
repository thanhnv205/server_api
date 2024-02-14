import { menuSystemModel } from '~/models/menuSystemModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { slugify } from '~/utils/formatters'

const getAllItems = async () => {
  try {
    return await menuSystemModel.getAllItems()
  } catch (error) {
    return error
  }
}

const getByName = async (name) => {
  try {
    return await menuSystemModel.getByName(name)
  } catch (error) {
    return error
  }
}

const getBySlug = async (slug) => {
  try {
    return await menuSystemModel.getBySlug(slug)
  } catch (error) {
    return error
  }
}

const createNew = async (data) => {
  try {
    // const newData = {
    //   ...data,
    //   slug: slugify(data.menu_name)
    // }
    // gọi tới tầng model => lưu newPermission vào Database
    const created = await menuSystemModel.createNew(data)

    // lấy bản ghi post khi được tạo
    return await menuSystemModel.findOneById(created.insertedId)
  } catch (error) {
    return error
  }
}

const getDetails = async (data) => {
  try {
    const menuSystem = await menuSystemModel.getDetails(data)

    if (!menuSystem) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'menuSystem not found!')
    }

    return menuSystem
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
    return await menuSystemModel.update(id, updateData)
  } catch (error) { return error }
}

const active = async (listId, body) => {
  try {
    const updateData = {
      active: body.active,
      updatedAt: Date.now()
    }

    return await menuSystemModel.active(listId, updateData)
  } catch (error) { return error }
}

const deleteItem = async (id) => {
  try {
    // xóa item
    await menuSystemModel.deleteOneById(id)
    return { deleteMessage: 'Delete posts successfully!' }
  } catch (error) { return error }
}

export const menuSystemService = {
  getAllItems,
  getByName,
  getBySlug,
  createNew,
  getDetails,
  update,
  active,
  deleteItem
}
