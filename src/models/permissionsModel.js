import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { getDB } from '~/config/mongodb'

const PERMISSIONS_COLLECTION_NAME = 'permissions'
const PERMISSIONS_COLLECTION_SCHEMA = Joi.object({
  active: Joi.boolean().default(true),
  permission_name: Joi.string().required().min(3).max(50).trim().strict(),
  permission_key: Joi.string().required().trim().strict(),
  permission_code: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().trim().strict().allow(''),
  icon: Joi.string().trim().strict().allow(''),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async (data) => {
  return await PERMISSIONS_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const getAllItems = async () => {
  try {
    return await getDB().collection(PERMISSIONS_COLLECTION_NAME).find().toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const valiData = await validateBeforeCreate(data)

    return await getDB().collection(PERMISSIONS_COLLECTION_NAME).insertOne(valiData)
  } catch (error) {
    throw new Error(error)
  }
}

const getByName = async (permission_name) => {
  try {
    return await getDB().collection(PERMISSIONS_COLLECTION_NAME).findOne({ permission_name })
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await getDB()
      .collection(PERMISSIONS_COLLECTION_NAME)
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
      .collection(PERMISSIONS_COLLECTION_NAME)
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

    const result = await getDB().collection(PERMISSIONS_COLLECTION_NAME).findOneAndUpdate(
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

    const result = await getDB().collection(PERMISSIONS_COLLECTION_NAME).updateMany(
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
      .collection(PERMISSIONS_COLLECTION_NAME)
      .deleteOne({
        _id: new ObjectId(id)
      })
  } catch (error) {
    throw new Error(error)
  }
}

export const permissionsModel = {
  PERMISSIONS_COLLECTION_NAME,
  PERMISSIONS_COLLECTION_SCHEMA,
  getAllItems,
  createNew,
  getByName,
  findOneById,
  getDetails,
  update,
  active,
  deleteOneById
}
