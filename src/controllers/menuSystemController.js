import { StatusCodes } from 'http-status-codes'
import { menuSystemService } from '~/services/menuSytemService'


const getAllItems = async (req, res, next) => {
  try {
    const menuSystem = await menuSystemService.getAllItems()
    res.status(StatusCodes.OK).json(menuSystem)
  } catch (error) {
    next(error)
  }
}

const createNew = async (req, res, next) => {
  try {
    const { menu_name, slug } = req.body

    const [existingName, existingSlug] = await Promise.all([
      menuSystemService.getByName(menu_name),
      menuSystemService.getBySlug(slug)
    ])

    const errorMessages = {
      existingName: 'Tên menu đã tồn tại',
      existingSlug: 'Slug đã tồn tại'
    }

    if (existingName || existingSlug) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: errorMessages[existingName ? 'existingName' : 'existingSlug'] })
    }

    const createdMenu = await menuSystemService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdMenu)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const menuSystem = await menuSystemService.getDetails(req.params.id)
    res.status(StatusCodes.OK).json(menuSystem)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const permissionId = req.params.id

    const updatedPost = await menuSystemService.update(permissionId, req.body)

    res.status(StatusCodes.OK).json(updatedPost)
  } catch (error) { next(error) }
}

const active = async (req, res, next) => {
  try {
    const postId = req.body.listId

    const updatedPost = await menuSystemService.active(postId, req.body)

    res.status(StatusCodes.OK).json(updatedPost)
  } catch (error) { next(error) }
}

const deleteItem = async (req, res, next) => {
  try {
    const postId = req.params.id
    const result = await menuSystemService.deleteItem(postId)

    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}


export const menuSystemController = {
  getAllItems,
  createNew,
  getDetails,
  update,
  active,
  deleteItem
}
