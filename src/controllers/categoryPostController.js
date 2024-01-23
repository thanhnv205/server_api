import { StatusCodes } from 'http-status-codes'
import { categoryPostService } from '~/services/categoryPostService'


const getAllItem = async (req, res, next) => {
  try {
    const categoryPosts = await categoryPostService.getAllItem()
    res.status(StatusCodes.OK).json(categoryPosts)
  } catch (error) {
    next(error)
  }
}

const createNew = async (req, res, next) => {
  try {
    const { slug } = req.body
    // Kiểm tra xem slug có tồn tại hay không
    const existingSlug = await categoryPostService.getBySlug(slug)
    console.log('slug =>>', existingSlug)
    if (existingSlug) {
      // Nếu slug đã tồn tại, trả về lỗi cho client
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Slug đã tồn tại' })
    }

    // Nếu slug không tồn tại, tiếp tục tạo mới post
    const createdPost = await categoryPostService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdPost)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const post = await categoryPostService.getDetails(req.params.id)
    res.status(StatusCodes.OK).json(post)
  } catch (error) {
    next(error)
  }
}

const destroyPost = async (req, res, next) => {}

export const categoryPostController = {
  getAllItem,
  createNew,
  getDetails,
  destroyPost
}
