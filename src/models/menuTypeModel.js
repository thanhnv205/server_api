import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '~/config/mongodb'

const MENU_TYPE_COLLECTION_NAME = 'menu-type'
const MENU_TYPE_COLLECTION_SCHEMA = Joi.object({
  type_name: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  active: Joi.boolean().default(false),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const getAllItems = async () => {
  try {
    return await getDB().collection(MENU_TYPE_COLLECTION_NAME).find()
  } catch (error) {
    throw new Error(error)
  }
}

export const menuTypeModel = {
  getAllItems
}