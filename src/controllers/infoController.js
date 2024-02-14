import { StatusCodes } from 'http-status-codes'
import { infoService } from '~/services/infoService'


const getInfo = async (req, res, next) => {
  try {
    const users = await infoService.getInfo()

    res.status(StatusCodes.OK).json(users)
  } catch (error) {
    next(error)
  }
}

const createInfo = async (req, res, next) => {
  try {
    const { email } = req.body

    const existingEmail = await infoService.getByEmail(email)

    if (existingEmail) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email đã tồn tại!' })
    }

    const createUser = await infoService.createInfo(req.body)
    res.status(StatusCodes.CREATED).json(createUser)
  } catch (error) {
    next(error)
  }
}


export const infoController = {
  getInfo,
  createInfo
}
