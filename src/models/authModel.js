import Joi from 'joi'
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'

import { getDB } from '~/config/mongodb'

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  email: Joi.string().required().email().trim().strict(),
  username: Joi.string().required().trim().strict(),
  password: Joi.string().required().min(6).trim().strict(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const SALT_ROUNDS = 10

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false
  })
}

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  return await bcrypt.hash(password, salt)
}

const createUser = async (data) => {
  try {
    const validatedData = await validateBeforeCreate(data)
    validatedData.password = await hashPassword(validatedData.password)

    return await getDB()
      .collection(USER_COLLECTION_NAME)
      .insertOne(validatedData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await getDB()
      .collection(USER_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id)
      })
  } catch (error) {
    throw new Error(error)
  }
}

const findByEmail = async (email) => {
  try {
    return await getDB().collection(USER_COLLECTION_NAME).findOne({
      email: email
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const authModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createUser,
  findOneById,
  findByEmail
}
