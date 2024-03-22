import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { getDB } from '~/config/mongodb'

const PRODUCT_COLLECTION_NAME = 'products'

const PRODUCT_COLLECTION_SCHEMA = Joi.object({
  product_code: Joi.string().required().min(3).max(50).trim().strict(),
  product_name: Joi.string().required().min(3).max(50).trim().strict(),
  product_price: Joi.number().integer().min(0),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  content: Joi.string().allow(null),
  product_image: Joi.string().trim().strict().allow(null),
  active: Joi.boolean().default(true),
  category_id: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  images: Joi.array()
    .required()
    .items(
      Joi.object({
        image_name: Joi.string().trim().strict().allow(null)
      })
    )
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const getAllItem = async () => {
  try {
    return await getDB().collection(PRODUCT_COLLECTION_NAME).find().toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const validateBeforeCreate = async (data) => {
  return await PRODUCT_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const getBySlug = async (slug) => {
  try {
    return await getDB().collection(PRODUCT_COLLECTION_NAME).findOne({
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
      .collection(PRODUCT_COLLECTION_NAME)
      .insertOne(valiData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await getDB()
      .collection(PRODUCT_COLLECTION_NAME)
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
      .collection(PRODUCT_COLLECTION_NAME)
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
      .collection(PRODUCT_COLLECTION_NAME)
      .deleteMany({
        _id: { $in: newIds }
      })
  } catch (error) {
    throw new Error(error)
  }
}

export const productModal = {
  PRODUCT_COLLECTION_NAME,
  PRODUCT_COLLECTION_SCHEMA,
  getAllItem,
  getBySlug,
  createNew,
  findOneById,
  getDetails,
  deleteById
}
