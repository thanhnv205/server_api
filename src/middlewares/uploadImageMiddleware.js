import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const urlParts = req.originalUrl.split('/')
    const uploadPath = path.join(__dirname, `../../uploads/images/${urlParts[2]}`)
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export const uploadImageMiddleware = multer({ storage })
