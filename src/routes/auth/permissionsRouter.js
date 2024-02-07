import express from 'express'
import { permissionsController } from '~/controllers/permissionsController'
import { permissionsValidation } from '~/validations/permissionsValidation'


const Router = express.Router()

Router.route('/')
  .get(permissionsController.getAllItems)
  .post(permissionsValidation.createNew, permissionsController.createNew)

export const permissionsRouter = Router
