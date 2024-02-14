import express from 'express'
import { menuTypeRoute } from './menuTypeRoute'
import { menuSystemRoute } from './menuSystemRouter'

const Router = express.Router()

Router.use('/menu-type', menuTypeRoute)
Router.use('/menu-system', menuSystemRoute)


export const APIs_system = Router
