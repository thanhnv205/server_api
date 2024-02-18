import { StatusCodes } from 'http-status-codes'
import { postService } from '~/services/postService'
import { generateFileName } from '~/utils/helper'

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts()

    res.status(StatusCodes.OK).json(posts)
  } catch (error) {
    next(error)
  }
}

const createNew = async (req, res, next) => {
  try {
    const { slug } = req.body
    const existingSlug = await postService.getBySlug(slug)

    if (existingSlug) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Slug đã tồn tại' })
    }

    // Nếu slug không tồn tại, tiếp tục tạo mới post
    const createdPost = await postService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdPost)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const post = await postService.getDetails(req.params.id)
    res.status(StatusCodes.OK).json(post)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const postId = req.params.id
    const updatedPost = await postService.update(postId, req.body)

    res.status(StatusCodes.OK).json(updatedPost)
  } catch (error) {
    next(error)
  }
}

const active = async (req, res, next) => {
  try {
    const postIds = req.body.ids
    const activePost = await postService.active(postIds, req.body)

    res.status(StatusCodes.OK).json(activePost)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const postId = req.params._id
    const result = await postService.deleteItem(postId)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

const uploadImage = async (req, res, next) => {
  try {
    const { filename, size } = req.file
    const { file_name, extname } = generateFileName(filename)

    const dataImage = {
      name: filename,
      file_name,
      extname,
      size,
      status: 'done',
      url: `http://localhost:4017/images/posts/${filename}`
    }

    res.status(StatusCodes.OK).json({ dataImage })
  } catch (error) {
    next(error)
  }
}


export const postController = {
  getAllPosts,
  createNew,
  getDetails,
  update,
  active,
  deleteItem,
  uploadImage
}
