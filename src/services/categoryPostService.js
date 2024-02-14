import { slugify } from '~/utils/formatters'
import { categoryPostModal } from '~/models/categoryPostModal'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const getAllItem = async () => {
  try {
    return await categoryPostModal.getAllItem()
  } catch (error) {
    return error
  }
}

const getBySlug = async (slug) => {
  try {
    const toSlug = slugify(slug)
    return await categoryPostModal.getBySlug(toSlug)
  } catch (error) {
    return error
  }
}

const createNew = async (data) => {
  try {
    const newCategoryPost = {
      ...data,
      slug: slugify(data.category_name)
    }

    // gọi tới tầng model => lưu newCategoryPost vào Database
    const createdpost = await categoryPostModal.createNew(newCategoryPost)

    // lấy bản ghi post khi được tạo
    return await categoryPostModal.findOneById(createdpost.insertedId)
  } catch (error) {
    return error
  }
}

const getDetails = async (data) => {
  try {
    const post = await categoryPostModal.getDetails(data)
    if (!post) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'post not found!')
    }

    return post
  } catch (error) {
    throw new Error(error)
  }
}

export const categoryPostService = {
  getAllItem,
  getBySlug,
  createNew,
  getDetails
}
