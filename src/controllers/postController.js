import { StatusCodes } from 'http-status-codes'
import { destroyImages, saveImages } from '~/middlewares/uploadImageMiddleware'
import { postService } from '~/services/postService'

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

    saveImages(req, res, next)
    const createdPost = await postService.createNew(req.body)
    res.status(StatusCodes.CREATED).json(createdPost)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const post = await postService.getDetails(req.params._id)
    res.status(StatusCodes.OK).json(post)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const postId = req.params._id
    const updatedPost = await postService.update(postId, req.body)

    res.status(StatusCodes.OK).json(updatedPost)
  } catch (error) {
    next(error)
  }
}

const active = async (req, res, next) => {
  try {
    const { listId } = req.body
    const activePost = await postService.active(listId, req.body)

    res.status(StatusCodes.OK).json(activePost)
  } catch (error) {
    next(error)
  }
}

const deleteItem = async (req, res, next) => {
  try {
    const { listId } = req.body
    const result = await postService.deleteItem(listId)
    destroyImages(req, res, next)
    res.status(StatusCodes.OK).json(result)
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
  deleteItem
}
