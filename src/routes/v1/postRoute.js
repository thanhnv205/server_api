import express from 'express'

import { postValidation } from '~/validations/postValidation'
import { postController } from '~/controllers/postController'
import { deleteImage, uploadImageMiddleware } from '~/middlewares/uploadImageMiddleware'

const Router = express.Router()

Router.route('/')
  .get(postController.getAllPosts)
  .post(postValidation.createNew, postController.createNew)

Router.route('/:_id')
  .get(postController.getDetails)
  .put(postValidation.update, postController.update)
  .delete(postValidation.deleteItem, postController.deleteItem)

Router.route('/active')
  .post(postValidation.active, postController.active)

Router.route('/upload-image')
  .post(uploadImageMiddleware.single('image'), postController.uploadImage)

Router.route('/delete-image')
  .post(postValidation.deleteImage, deleteImage)

export const postRoute = Router
