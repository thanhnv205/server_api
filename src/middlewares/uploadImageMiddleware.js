import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { generateFileName } from '~/utils/helper'
import { StatusCodes } from 'http-status-codes'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const urlParts = req.originalUrl.split('/')
    const uploadPath = path.join(__dirname, `../../uploads/images/${urlParts[2]}`)
    cb(null, uploadPath)
  },

  filename: function (req, file, cb) {
    const { file_name } = generateFileName(file.originalname)
    cb(null, file_name)
  }
})

export const uploadImageMiddleware = multer({ storage })

export const serveImages = (req, res, next) => {
  const { type } = req.params
  const imagePath = path.resolve(__dirname, `../../uploads/images/${type}`)
  express.static(imagePath)(req, res, next)
}

export const deleteImage = async (req, res) => {
  try {
    const { file } = req.body
    const urlParts = req.originalUrl.split('/')
    const imagePath = path.resolve(__dirname, `../../uploads/images/${urlParts[2]}/${file}`)

    fs.unlinkSync(imagePath)
    res.status(StatusCodes.OK).json({ message: 'Xóa hình ảnh thành công!' })
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: 'Không tìm thấy hình ảnh.'
    })
  }
}