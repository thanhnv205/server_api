import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// khởi tạo 1 đối tượng databaseInstance ban đầu là null (vì chưa connect)
let databaseInstance = null

// khởi tạo đôi tượng client instance để connect mongodb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// kết nối database
export const connectDB = async () => {
  await mongoClientInstance.connect()

  // kết nối thành công => lấy ra database theo tên và gán vào biến databaseInstance
  databaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// export databaseInstance sau khi connect thành công tới mongoDB
export const getDB = () => {
  if (!databaseInstance) throw new Error('Must connect to Database first!')

  return databaseInstance
}

// đóng kết nối database
export const closeDB = async () => {
  await mongoClientInstance.close()
}
