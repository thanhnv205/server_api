import { userModel } from '~/models/userModel'


const getAllUsers = async () => {
  try {
    return await userModel.getAllUsers()
  } catch (error) {
    return error
  }
}

export const userService = {
  getAllUsers
}