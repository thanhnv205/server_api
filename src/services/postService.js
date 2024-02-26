import { slugify } from '~/utils/formatters'
import { postModel } from '~/models/postModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const getAllPosts = async () => {
  try {
    return await postModel.getAllPosts()
  } catch (error) {
    return error
  }
}

const getBySlug = async (slug) => {
  try {
    return await postModel.getBySlug(slug)
  } catch (error) {
    return error
  }
}

const createNew = async (data) => {
  try {
    const newPosts = {
      ...data,
      slug: slugify(data.post_name)
    }

    const createdpost = await postModel.createNew(newPosts)
    return await postModel.findOneById(createdpost.insertedId)
  } catch (error) {
    return error
  }
}

const getDetails = async (data) => {
  try {
    const post = await postModel.getDetails(data)

    if (!post) throw new ApiError(StatusCodes.NOT_FOUND, 'post not found!')

    return post
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
    return await postModel.update(id, updateData)
  } catch (error) {
    return error
  }
}

const active = async (id, data) => {
  try {
    const updateDate = {
      active: data.active,
      updatedAt: Date.now()
    }
    await postModel.active(id, updateDate)
    return { message: 'Active posts successfully!' }
  } catch (error) {
    return error
  }
}

const deleteItem = async (ids) => {
  try {
    await postModel.deleteManyById(ids)
    return { message: 'Delete posts successfully!' }
  } catch (error) {
    return error
  }
}

export const postService = {
  getAllPosts,
  getBySlug,
  createNew,
  getDetails,
  update,
  active,
  deleteItem
}
