import { StatusCodes } from 'http-status-codes'
import { generateFileName } from '~/utils/helper'

const uploadImage = async (req, res, next) => {
  try {
    const { filename, size, originalname } = req.file
    const { extname } = generateFileName(filename)

    const dataImage = {
      name: originalname,
      filename,
      extname,
      size,
      status: 'done',
      url: `http://localhost:4017/images/posts/${filename}`
    }

    res.status(StatusCodes.OK).json(dataImage)
  } catch (error) {
    next(error)
  }
}

export const uploadImageController = {
  uploadImage
}