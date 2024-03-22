import express from 'express'

import { productController } from '~/controllers/productController'
import { productValidation } from '~/validations/productValidation'

const Router = express.Router()

Router.route('/')
  .get(productController.getAllItem)
  .post(productValidation.createNew, productController.createNew)

// Router.route('/active')
//   .post(productValidation.active, productController.active)

Router.route('/destroy').post(
  productValidation.deleteItem,
  productController.deleteItem
)

Router.route('/:id').get(productController.getDetails).put()

export const productRoute = Router
