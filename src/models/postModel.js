import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { getDB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { categoryPostModal } from './categoryPostModal'

const POST_COLLECTION_NAME = 'posts'
const POST_COLLECTION_SCHEMA = Joi.object({
  active: Joi.boolean().required().default(true),
  post_name: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  description: Joi.string().required().min(0).max(256).trim().strict(),
  image_name: Joi.string().trim().strict().allow(null),
  content: Joi.string().allow('', null),
  public_date: Joi.string().required().trim().strict(),
  category_post_id: Joi.array().required().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async (data) => {
  return await POST_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const getAllPosts = async () => {
  try {
    const posts = await getDB().collection(POST_COLLECTION_NAME).find().toArray()
    const allCate = await getDB().collection(categoryPostModal.CATEGORY_POST_COLLECTION_NAME).find().toArray()

    const cateId = allCate.map(({ _id }) => _id.toString())

    const newData = posts.map(item => ({
      ...item,
      category_name: cateId.includes(item.category_post_id) ? 'abc' : 'xyz'
    }))
    console.log(newData)
    // posts.forEach(item => {
    //   console.log('cateId =>', cateId)
    //   console.log('item.category_post_id =>', item.category_post_id)
    //   const isIncluded = item.category_post_id.includes(cateId)
    //   const newData = ca
    //   console.log(cateId[item.category_post_id])

    // })
    return posts
  } catch (error) {
    throw new Error(error)
  }
}

const getBySlug = async (slug) => {
  try {
    return await getDB().collection(POST_COLLECTION_NAME).findOne({
      slug: slug
    })
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const valiData = await validateBeforeCreate(data)
    return await getDB().collection(POST_COLLECTION_NAME).insertOne(valiData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await getDB()
      .collection(POST_COLLECTION_NAME)
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
      .collection(POST_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id)
      })
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    Object.keys(data).forEach((item) => {
      if (INVALID_UPDATE_FIELDS.includes(item)) {
        delete data[item]
      }
    })

    const result = await getDB()
      .collection(POST_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: 'after' }
      )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const active = async (ids, data) => {
  try {
    Object.keys(data).forEach((item) => {
      if (INVALID_UPDATE_FIELDS.includes(item)) {
        delete data[item]
      }
    })

    const newIds = ids.map((id) => new ObjectId(id))

    const result = await getDB()
      .collection(POST_COLLECTION_NAME)
      .updateMany(
        { _id: { $in: newIds } },
        { $set: data },
        { returnDocument: 'after' }
      )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deleteManyById = async (ids) => {
  try {
    const newIds = ids.map((id) => new ObjectId(id))
    return await getDB()
      .collection(POST_COLLECTION_NAME)
      .deleteMany({
        _id: { $in: newIds }
      })
  } catch (error) {
    throw new Error(error)
  }
}

export const postModel = {
  POST_COLLECTION_NAME,
  POST_COLLECTION_SCHEMA,
  getAllPosts,
  getBySlug,
  createNew,
  findOneById,
  getDetails,
  update,
  active,
  deleteManyById
}
