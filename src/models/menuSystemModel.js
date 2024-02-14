import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { getDB } from '~/config/mongodb'

const MENU_SYSTEM_COLLECTION_NAME = 'menu-system'
const MENU_SYSTEM_COLLECTION_SCHEMA = Joi.object({
  active: Joi.boolean().default(true),
  id_parent: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).default('0'),
  id_type: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  menu_name: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().trim().strict().default(null),
  target: Joi.string().trim().strict().default(null),
  url: Joi.string().trim().strict().default(null),
  icon: Joi.string().trim().strict().default(null),
  slug: Joi.string().required().min(3).trim().strict(),
  image: Joi.string().uri().trim().strict().default(null),
  order_by: Joi.number().integer().min(1),
  permissions: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async (data) => {
  return await MENU_SYSTEM_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const getAllItems = async () => {
  try {
    return await getDB().collection(MENU_SYSTEM_COLLECTION_NAME).find().toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const valiData = await validateBeforeCreate(data)

    return await getDB().collection(MENU_SYSTEM_COLLECTION_NAME).insertOne(valiData)
  } catch (error) {
    throw new Error(error)
  }
}

const getByName = async (menu_name) => {
  try {
    return await getDB().collection(MENU_SYSTEM_COLLECTION_NAME).findOne({ menu_name })
  } catch (error) {
    throw new Error(error)
  }
}

const getBySlug = async (slug) => {
  try {
    return await getDB().collection(MENU_SYSTEM_COLLECTION_NAME).findOne({ slug })
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await getDB()
      .collection(MENU_SYSTEM_COLLECTION_NAME)
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
      .collection(MENU_SYSTEM_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id)
      })

  } catch (error) {
    throw new Error(error)
  }
}


const update = async (id, data) => {
  try {
    Object.keys(data).forEach(item => {
      if (INVALID_UPDATE_FIELDS.includes(item)) {
        delete data[item]
      }
    })

    const result = await getDB().collection(MENU_SYSTEM_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: 'after' }
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const active = async (listId, data) => {
  try {
    Object.keys(data).forEach(item => {
      if (INVALID_UPDATE_FIELDS.includes(item)) {
        delete data[item]
      }
    })

    const newIds = listId.map(id => new ObjectId(id))

    const result = await getDB().collection(MENU_SYSTEM_COLLECTION_NAME).updateMany(
      { _id: { $in: newIds } },
      { $set: data },
      { returnDocument: 'after' }
    )

    return result
  } catch (error) {
    throw new Error(error)
  }
}

const deleteOneById = async (id) => {
  try {
    return await getDB()
      .collection(MENU_SYSTEM_COLLECTION_NAME)
      .deleteOne({
        _id: new ObjectId(id)
      })
  } catch (error) {
    throw new Error(error)
  }
}

export const menuSystemModel = {
  MENU_SYSTEM_COLLECTION_NAME,
  MENU_SYSTEM_COLLECTION_SCHEMA,
  getAllItems,
  createNew,
  getByName,
  getBySlug,
  findOneById,
  getDetails,
  update,
  active,
  deleteOneById
}
