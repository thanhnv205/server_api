import { StatusCodes } from 'http-status-codes'
import { permissionsService } from '~/services/permissionsService'

const getAllItems = async (req, res, next) => {
  try {
    const posts = await permissionsService.getAllItems()

    res.status(StatusCodes.OK).json(posts)
  } catch (error) {
    next(error)
  }
}

const createNew = async (req, res, next) => {
  try {
    const { permission_name } = req.body

    const existingName = await permissionsService.getByName(permission_name)

    if (existingName) {
      // Nếu name đã tồn tại, trả về lỗi cho client
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Tên phân quyền đã tồn tại đã tồn tại' })
    }

    const createdPermission = await permissionsService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdPermission)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const post = await permissionsService.getDetails(req.params.id)
    res.status(StatusCodes.OK).json(post)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const postId = req.params.id
    const updatedPost = await permissionsService.active(postId, req.body)

    res.status(StatusCodes.OK).json(updatedPost)
  } catch (error) { next(error) }
}

const active = async (req, res, next) => {
  try {
    const postId = req.body.listId

    const updatedPost = await permissionsService.active(postId, req.body)

    res.status(StatusCodes.OK).json(updatedPost)
  } catch (error) { next(error) }
}

const deleteItem = async (req, res, next) => {
  try {
    const postId = req.params.id
    const result = await permissionsService.deleteItem(postId)

    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}


export const permissionsController = {
  getAllItems,
  createNew,
  getDetails,
  update,
  active,
  deleteItem
}
