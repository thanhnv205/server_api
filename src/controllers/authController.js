import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { userModel } from '../models/userModel'

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    // Kiểm tra xem người dùng có tồn tại không
    const user = await userModel.findByEmail(email)
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Email hoặc mật khẩu không đúng' })
    }

    // Kiểm tra mật khẩu
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Email hoặc mật khẩu không đúng' })
    }

    // Tạo JWT token
    const token = jwt.sign({ user: { id: user._id } }, 'your_secret_key', {
      expiresIn: '1h'
    })

    res.status(StatusCodes.OK).json({ token })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message })
  }
}

const createUser = async (req, res) => {
  try {
    const { email, password, username } = req.body

    // Kiểm tra user có tồn tại chưa
    const existingUser = await userModel.findByEmail(email)

    if (existingUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: 'Email đã được đăng ký' })
    }

    // Tạo mới user
    const newUser = await userModel.createUser({ username, email, password })
    res.status(StatusCodes.CREATED).json(newUser)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message })
  }
}

export { loginUser, createUser }
