/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cross'

import exitHook from 'async-exit-hook'
import { connectDB, closeDB } from '~/config/mongodb'
import { env } from '~/config/environment'

import authRoutes from '~/routes/v1/authRoute'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const startServer = () => {
  const app = express()
  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/auth', authRoutes)
  app.use('/v1', APIs_V1)

  // middleware handler erorr
  app.use(errorHandlingMiddleware)

  app.listen(env.PORT, env.APP_HOST, () => {
    console.log(`Server running at http://${env.APP_HOST}:${env.PORT}`)
  })

  // cleanup trước khi dừng server
  exitHook(() => {
    closeDB()
    console.log('exiting')
  })
};

(async () => {
  try {
    await connectDB()
    console.log('Connected to MongoDB Cloud Atlas!')
    startServer()
  } catch (error) {
    process.exit(0)
  }
})()
