import { userModel } from '~/models/userModel'


const getUser = async () => {
  try {
    return await userModel.getAllUsers()
  } catch (error) {
    return error
  }
}

const getByName = async (name) => {
  try {
    return await userModel.getByName(name)
  } catch (error) {
    return error
  }
}

const getByEmail = async (email) => {
  try {
    return await userModel.getByEmail(email)
  } catch (error) {
    return error
  }
}

export const userService = {
  getUser,
  getByName,
  getByEmail
}