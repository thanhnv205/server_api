import express from 'express'
import { authRouter } from './authRouter'
import { userRouter } from './userRouter'
import { permissionsRouter } from './permissionsRouter'


const Router = express.Router()

Router.use('/login', authRouter)

Router.use('/user', userRouter)
// Router.post('/create-user', createUser)

Router.use('/list-permission', permissionsRouter)

export const APIs_Auth = Router
