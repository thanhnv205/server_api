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
    const existingSlug = await categoryPostService.getBySlug(slug)

    if (existingSlug) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Slug đã tồn tại' })
    }

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

const destroyPost = async (req, res, next) => { }

export const categoryPostController = {
  getAllItem,
  createNew,
  getDetails,
  destroyPost
}
