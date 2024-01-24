import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { postValidation } from '~/validations/postValidation'
import { postController } from '~/controllers/postController'

const Router = express.Router()

Router.route('/')
  .get(postController.getAllPosts)
  .post(postValidation.createNew, postController.createNew)

Router.route('/:id').get(postController.getDetails).put()

export const postRoute = Router