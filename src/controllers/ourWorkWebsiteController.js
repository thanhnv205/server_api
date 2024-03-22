import { ourWorkWebsiteService } from '~/services/ourWorkWebsiteService'

const { StatusCodes } = require('http-status-codes')

const getAllItems = async (req, res, next) => {
  try {
    const communities = await ourWorkWebsiteService.getAllItems()
    res.status(StatusCodes.OK).json(communities)
  } catch (error) {
    next(error)
  }
}

const createNew = async (req, res, next) => {
  try {
    const { slug } = req.body
    const existingSlug = await ourWorkWebsiteService.findBySlug(slug)

    if (existingSlug) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Slug đã tồn tại.' })
    }

    const created = await ourWorkWebsiteService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(created)
  } catch (error) {
    next(error)
  }
}

export const ourWorkWebsiteController = {
  getAllItems,
  createNew
}
