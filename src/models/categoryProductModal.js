import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '~/config/mongodb'

const CATEGORY_PRODUCT_COLLECTION_NAME = 'category-products'

const CATEGORY_PRODUCT_COLLECTION_SCHEMA = Joi.object({
  active: Joi.boolean().default(true),
  category_code: Joi.string().required().min(3).max(50).trim().strict(),
  category_name: Joi.string().required().min(3).max(50).trim().strict(),
  category_price: Joi.number().integer().min(0),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().max(256).trim().strict(),
  category_image: Joi.string().trim().strict().allow(null),
  icon: Joi.string().trim().strict().default(null),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const getAllItem = async () => {
  try {
    return await getDB()
      .collection(CATEGORY_PRODUCT_COLLECTION_NAME)
      .find()
      .toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const validateBeforeCreate = async (data) => {
  return await CATEGORY_PRODUCT_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const getBySlug = async (slug) => {
  try {
    return await getDB().collection(CATEGORY_PRODUCT_COLLECTION_NAME).findOne({
      slug: slug
    })
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const valiData = await validateBeforeCreate(data)

    return await getDB()
      .collection(CATEGORY_PRODUCT_COLLECTION_NAME)
      .insertOne(valiData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await getDB()
      .collection(CATEGORY_PRODUCT_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id)
      })
  } catch (error) {
    throw new Error(error)
  }
}

// query tổng hợp (aggregate)
const getDetails = async (id) => {
  try {
    return await getDB()
      .collection(CATEGORY_PRODUCT_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id)
      })
  } catch (error) {
    throw new Error(error)
  }
}

const deleteById = async (ids) => {
  try {
    const newIds = ids.map((id) => new ObjectId(id))
    return await getDB()
      .collection(CATEGORY_PRODUCT_COLLECTION_NAME)
      .deleteMany({
        _id: { $in: newIds }
      })
  } catch (error) {
    throw new Error(error)
  }
}

export const categoryProductModal = {
  CATEGORY_PRODUCT_COLLECTION_NAME,
  CATEGORY_PRODUCT_COLLECTION_SCHEMA,
  getAllItem,
  getBySlug,
  createNew,
  findOneById,
  getDetails,
  deleteById
}
