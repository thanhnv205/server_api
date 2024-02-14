import express from 'express'
import { menuSystemController } from '~/controllers/menuSystemController'
import { menuSystemValidation } from '~/validations/menuSystemValidation'

const Router = express.Router()

Router.route('/')
  .get(menuSystemController.getAllItems)
  .post(menuSystemValidation.createNew, menuSystemController.createNew)

export const menuSystemRoute = Router