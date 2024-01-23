import 'dotenv/config'

export const env = {
  PORT: process.env.PORT,
  APP_HOST: process.env.APP_HOST,
  DATABASE_NAME: process.env.DATABASE_NAME,
  MONGODB_URI: process.env.MONGODB_URI,
  BUILD_MODE: process.env.BUILD_MODE
}