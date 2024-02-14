import express from 'express'
import { infoController } from '~/controllers/infoController'
import { infoValidation } from '~/validations/infoValidation'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

Router.route('/')
  .get(authMiddleware, infoController.getInfo)
  .post(infoValidation.createInfo, infoController.createInfo)

export const infoRouter = Router