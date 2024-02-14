import express from 'express'
import { menuTypeController } from '~/controllers/menuTypeController'
import { menuTypeValidation } from '~/validations/menuTypeValidation'

const Router = express.Router()

Router.route('/')
  .get(menuTypeController.getAllItems)
  .post(menuTypeValidation.createNew, menuTypeController.createNew)

export const menuTypeRoute = Router