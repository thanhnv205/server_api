import Joi from 'joi'
import { ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'

import { getDB } from '~/config/mongodb'

const INFO_COLLECTION_NAME = 'info'
const INFO_COLLECTION_SCHEMA = Joi.object({
  code_id: Joi.string().trim().strict(),
  user_name: Joi.string().required().min(3).max(50).trim().strict(),
  email: Joi.string().required().email().trim().strict(),
  password: Joi.string().required().min(6).trim().strict(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const SALT_ROUNDS = 10
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async (data) => {
  return await INFO_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const getInfo = async () => {
  try {
    return await getDB().collection(INFO_COLLECTION_NAME).find().toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const getByName = async (user_name) => {
  try {
    return await getDB().collection(INFO_COLLECTION_NAME).findOne({ user_name })
  } catch (error) {
    throw new Error(error)
  }
}

const getByEmail = async (email) => {
  try {
    return await getDB().collection(INFO_COLLECTION_NAME).findOne({ email })
  } catch (error) {
    throw new Error(error)
  }
}

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  return await bcrypt.hash(password, salt)
}


const createInfo = async (data) => {
  const validatedData = await validateBeforeCreate(data)
  try {
    validatedData.password = await hashPassword(validatedData.password)

    return await getDB()
      .collection(INFO_COLLECTION_NAME)
      .insertOne(validatedData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await getDB()
      .collection(INFO_COLLECTION_NAME)
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
      .collection(INFO_COLLECTION_NAME)
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

    const result = await getDB().collection(INFO_COLLECTION_NAME).findOneAndUpdate(
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

    const result = await getDB().collection(INFO_COLLECTION_NAME).updateMany(
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
      .collection(INFO_COLLECTION_NAME)
      .deleteOne({
        _id: new ObjectId(id)
      })
  } catch (error) {
    throw new Error(error)
  }
}

export const infoModel = {
  INFO_COLLECTION_NAME,
  INFO_COLLECTION_SCHEMA,
  getInfo,
  getByName,
  getByEmail,
  createInfo,
  findOneById,
  getDetails,
  update,
  active,
  deleteOneById
}
