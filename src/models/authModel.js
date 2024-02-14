import Joi from 'joi'
import { ObjectId } from 'mongodb'

import { getDB } from '~/config/mongodb'

const AUTH_COLLECTION_NAME = 'info'
const AUTH_COLLECTION_SCHEMA = Joi.object({
  email: Joi.string().required().email().trim().strict(),
  username: Joi.string().required().trim().strict(),
  password: Joi.string().required().min(6).trim().strict(),

  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroy: Joi.boolean().default(false)
})

const findOneById = async (id) => {
  try {
    return await getDB()
      .collection(AUTH_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id)
      })
  } catch (error) {
    throw new Error(error)
  }
}

const findByEmail = async (email) => {
  try {
    return await getDB().collection(AUTH_COLLECTION_NAME).findOne({
      email: email
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const authModel = {
  AUTH_COLLECTION_NAME,
  AUTH_COLLECTION_SCHEMA,
  findOneById,
  findByEmail
}
