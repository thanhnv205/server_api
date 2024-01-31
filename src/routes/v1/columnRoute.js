import express from 'express'
import { columnValidation } from '~/validations/columnValidation'
import { columnController } from '~/controllers/columnController'

const Router = express.Router()

Router.route('/').post(columnValidation.createNew, columnController.createNew)

Router.route('/:id').delete(columnValidation.deleteItem, columnController.deleteItem)
export const columnRoute = Router