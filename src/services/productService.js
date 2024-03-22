import { slugify } from '~/utils/formatters'
import { productModal } from '~/models/productModal'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const getAllItem = async () => {
  try {
    return await productModal.getAllItem()
  } catch (error) {
    return error
  }
}

const getBySlug = async (slug) => {
  try {
    const toSlug = slugify(slug)
    return await productModal.getBySlug(toSlug)
  } catch (error) {
    return error
  }
}

const createNew = async (data) => {
  try {
    const newProduct = {
      ...data,
      slug: slugify(data.product_name)
    }
    const createdpost = await productModal.createNew(newProduct)

    // lấy bản ghi post khi được tạo
    return await productModal.findOneById(createdpost.insertedId)
  } catch (error) {
    return error
  }
}

const getDetails = async (data) => {
  try {
    const post = await productModal.getDetails(data)
    if (!post) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'post not found!')
    }

    return post
  } catch (error) {
    throw new Error(error)
  }
}

const deleteItem = async (ids) => {
  try {
    await productModal.deleteById(ids)
    return { message: 'Delete products successfully!' }
  } catch (error) {
    return error
  }
}

export const productService = {
  getAllItem,
  getBySlug,
  createNew,
  getDetails,
  deleteItem
}
