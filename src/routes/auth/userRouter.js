import express from 'express'
import { userController } from '~/controllers/userController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { userValidation } from '~/validations/userValidation'

const Router = express.Router()

Router.route('/')
  .get(authMiddleware, userController.getAllUsers)
  .post(userValidation.createUser, userController.createUser)

export const userRouter = Router