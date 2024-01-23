import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { getDB } from '~/config/mongodb'

const CATEGORY_POST_COLLECTION_NAME = 'category-posts'

const CATEGORY_POST_COLLECTION_SCHEMA = Joi.object({
  category_name: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  active: Joi.boolean().default(true),
  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const getAllItem = async () => {
  try {
    return await getDB().collection(CATEGORY_POST_COLLECTION_NAME).find().toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const validateBeforeCreate = async (data) => {
  return await CATEGORY_POST_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const getBySlug = async (slug) => {
  try {
    return await getDB().collection(CATEGORY_POST_COLLECTION_NAME).findOne({
      slug: slug
    })
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const valiData = await validateBeforeCreate(data)

    return await getDB().collection(CATEGORY_POST_COLLECTION_NAME).insertOne(valiData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await getDB()
      .collection(CATEGORY_POST_COLLECTION_NAME)
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
      .collection(CATEGORY_POST_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id)
      })
  } catch (error) {
    throw new Error(error)
  }
}

export const categoryPostModal = {
  CATEGORY_POST_COLLECTION_NAME,
  CATEGORY_POST_COLLECTION_SCHEMA,
  getAllItem,
  getBySlug,
  createNew,
  findOneById,
  getDetails
}
