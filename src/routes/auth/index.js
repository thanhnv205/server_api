import express from 'express'
import { authRouter } from './authRouter'
import { userRouter } from './userRouter'
import { permissionsRouter } from './permissionsRouter'
import { infoRouter } from './infoRouter'


const Router = express.Router()

Router.use('/login', authRouter)

Router.use('/info', infoRouter)
Router.use('/user', userRouter)

Router.use('/list-permissions', permissionsRouter)

export const APIs_auth = Router
