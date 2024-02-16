import express from 'express'
import { postValidation } from '~/validations/postValidation'
import { postController } from '~/controllers/postController'

const Router = express.Router()

Router.route('/')
  .get(postController.getAllPosts)
  .post(postValidation.createNew, postController.createNew)

<<<<<<< HEAD
Router.route('/:_id')
=======
Router.route('/active')
  .post(postValidation.active, postController.active)

Router.route('/:id')
>>>>>>> 5fd6c9ed5321d2e8523eea675701bf4a76f85194
  .get(postController.getDetails)
  .put(postValidation.update, postController.update)
  .delete(postValidation.deleteItem, postController.deleteItem)

Router.route('/active')
  .post( postValidation.active, postController.active)

export const postRoute = Router
