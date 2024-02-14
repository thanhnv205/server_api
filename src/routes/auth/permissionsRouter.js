import express from 'express'
import { permissionsController } from '~/controllers/permissionsController'
import { permissionsValidation } from '~/validations/permissionsValidation'


const Router = express.Router()

Router.route('/')
  .get(permissionsController.getAllItems)
  .post(permissionsValidation.createNew, permissionsController.createNew)


Router.route('/:id')
  .get(permissionsController.getDetails)
  .put(permissionsValidation.update, permissionsController.update)
  .delete(permissionsValidation.deleteItem, permissionsController.deleteItem)

export const permissionsRouter = Router
