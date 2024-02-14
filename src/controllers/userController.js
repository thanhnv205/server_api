import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService'


const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getUser()

    res.status(StatusCodes.OK).json(users)
  } catch (error) {
    next(error)
  }
}

const createUser = async (req, res, next) => {
  try {
    const { user_name, email } = req.body

    const [existingName, existingEmail] = await Promise.all([
      userService.getByName(user_name),
      userService.getByEmail(email)
    ])

    const errorMessages = {
      existingName: 'Tên người dùng đã tồn tại',
      existingEmail: 'Email đã tồn tại'
    }

    if (existingName || existingEmail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: errorMessages[existingName ? 'existingName' : 'existingEmail'] })
    }

    const createUser = await userService.createUser(req.body)

    res.status(StatusCodes.CREATED).json(createUser)
  } catch (error) {
    next(error)
  }
}

export const userController = {
  getAllUsers,
  createUser
}
