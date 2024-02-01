import express from 'express'
import { postValidation } from '~/validations/postValidation'
import { postController } from '~/controllers/postController'

const Router = express.Router()

Router.route('/')
  .get(postController.getAllPosts)
  .post(postValidation.createNew, postController.createNew)

Router.route('/:id')
  .get(postController.getDetails)
  .put(postValidation.update, postController.update)

export const postRoute = Router
