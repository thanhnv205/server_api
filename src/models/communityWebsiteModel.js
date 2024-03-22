import Joi from 'joi'
import { getDB } from '~/config/mongodb'

const COMMUNITY_WEBSITE_COLLECTION_NAME = 'community-website'
const COMMUNITY_WEBSITE_COLLECTION_SCHEMA = Joi.object({
  active: Joi.boolean().required().default(true),
  heading: Joi.string().required().min(3).max(256).trim().strict(),
  title: Joi.string().required().trim().strict(),
  description: Joi.string().required().min(0).max(256).trim().strict(),
  slug: Joi.string().required().trim().strict(),

  communities: Joi.array()
    .required()
    .items(
      Joi.object({
        title: Joi.string().required().trim().strict(),
        description: Joi.string().required().min(0).max(256).trim().strict(),
        image_name: Joi.string().trim().strict().allow(null)
      })
    )
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async (data) => {
  return await COMMUNITY_WEBSITE_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const getAllItems = async () => {
  try {
    return await getDB()
      .collection(COMMUNITY_WEBSITE_COLLECTION_NAME)
      .findOne()
  } catch (error) {
    throw new Error(error)
  }
}

const findBySlug = async (slug) => {
  try {
    return await getDB().collection(COMMUNITY_WEBSITE_COLLECTION_NAME).findOne({
      slug
    })
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await getDB()
      .collection(COMMUNITY_WEBSITE_COLLECTION_NAME)
      .findOne({ _id: new Object(id) })
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const valiData = await validateBeforeCreate(data)

    return await getDB()
      .collection(COMMUNITY_WEBSITE_COLLECTION_NAME)
      .insertOne(valiData)
  } catch (error) {
    throw new Error(error)
  }
}

export const communityWebsiteModel = {
  COMMUNITY_WEBSITE_COLLECTION_NAME,
  COMMUNITY_WEBSITE_COLLECTION_SCHEMA,
  getAllItems,
  findBySlug,
  createNew,
  findOneById
}
