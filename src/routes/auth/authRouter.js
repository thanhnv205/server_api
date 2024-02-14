import express from 'express'
import { authController } from '~/controllers/authController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { authValidation } from '~/validations/authValidation'

const Router = express.Router()

Router.route('/')
  .post(authMiddleware, authValidation.loginUser, authController.loginUser)

export const authRouter = Router
