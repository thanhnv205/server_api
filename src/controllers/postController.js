import { StatusCodes } from 'http-status-codes'
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
    // Kiểm tra xem slug đã tồn tại hay không
    const existingSlug = await postService.getBySlug(slug)

    if (existingSlug) {
      // Nếu slug đã tồn tại, trả về lỗi cho client
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

const destroyPost = async (req, res, next) => {}

export const postController = {
  getAllPosts,
  createNew,
  getDetails,
  destroyPost
}
