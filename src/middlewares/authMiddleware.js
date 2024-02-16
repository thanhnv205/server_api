import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import { StatusCodes } from 'http-status-codes'

export const authMiddleware = (req, res, next) => {
  const token = req.header('token')

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Token không hợp lệ, đăng nhập để tiếp tục' })
  }

  try {
    // lấy token sau Bearer
    const splitToken = token.split(' ')[1]
    const decoded = jwt.verify(splitToken, env.JWT_SECRET_KEY)

    req.user = decoded.user
    next()
  } catch (error) {
    res.status(StatusCodes.FORBIDDEN).json({ message: 'Token đã hết hạn' })
  }
}
