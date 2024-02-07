import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'


const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers()

    res.status(StatusCodes.OK).json(users)
  } catch (error) {
    next(error)
  }
}

export const userController = {
  getAllUsers
}
