import express from 'express'


import { categoryPostController } from '~/controllers/categoryPostController'
import { categoryPostValidation } from '~/validations/categoryPostValidation'

const Router = express.Router()

Router.route('/')
  .get(categoryPostController.getAllItem)
  .post(categoryPostValidation.createNew, categoryPostController.createNew)

Router.route('/:id').get(categoryPostController.getDetails).put()

export const categoryPostRoute = Router
