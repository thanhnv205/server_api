import { ourWorkWebsiteModel } from '~/models/ourWorkWebsiteModel'
import { slugify } from '~/utils/formatters'

const getAllItems = async () => {
  try {
    return await ourWorkWebsiteModel.getAllItems()
  } catch (error) {
    return error
  }
}

const findBySlug = async (slug) => {
  try {
    return await ourWorkWebsiteModel.findBySlug(slug)
  } catch (error) {
    return error
  }
}

const createNew = async (data) => {
  try {
    const created = await ourWorkWebsiteModel.createNew(data)

    return await ourWorkWebsiteModel.findOneById(created.insertedId)
  } catch (error) {
    return error
  }
}

export const ourWorkWebsiteService = {
  getAllItems,
  findBySlug,
  createNew
}
